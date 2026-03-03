"use client";
/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useActionState, useState } from "react";
import { GcdsInput } from "@gcds-core/components-react";
import { PasswordComplexitySettings } from "@zitadel/proto/zitadel/settings/v2/password_settings_pb";
import * as v from "valibot";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { codeSchema, confirmPasswordSchema, passwordSchema } from "@lib/validationSchemas";
import { I18n, useTranslation } from "@i18n";
import { SubmitButtonAction } from "@components/ui/button/SubmitButton";
import { ErrorSummary } from "@components/ui/form/ErrorSummary";

/*--------------------------------------------*
 * Local Relative
 *--------------------------------------------*/
import { PasswordComplexity } from "./PasswordComplexity";
type FormState = {
  error?: string;
  validationErrors?: { fieldKey: string; fieldValue: string }[];
  formData?: {
    password?: string;
    confirmPassword?: string;
    code?: string;
  };
};

const validateCreatePassword = async (
  formEntries: { [k: string]: FormDataEntryValue },
  passwordComplexitySettings = {},
  requireConfirmationCode = false
) => {
  const baseSchemaEntries = {
    ...passwordSchema(passwordComplexitySettings),
    ...confirmPasswordSchema(),
  };

  const schemaWithCode = v.pipe(
    v.object({
      ...baseSchemaEntries,
      ...codeSchema(),
    }),
    v.forward(
      v.check((input) => input.password === input.confirmPassword, "mustMatch"),
      ["confirmPassword"]
    )
  );

  const schemaWithoutCode = v.pipe(
    v.object(baseSchemaEntries),
    v.forward(
      v.check((input) => input.password === input.confirmPassword, "mustMatch"),
      ["confirmPassword"]
    )
  );

  const passwordValidationSchema = requireConfirmationCode ? schemaWithCode : schemaWithoutCode;
  return v.safeParse(passwordValidationSchema, formEntries, { abortPipeEarly: true });
};

export function PasswordValidationForm({
  passwordComplexitySettings,
  successCallback,
  requireConfirmationCode = false,
}: {
  passwordComplexitySettings: PasswordComplexitySettings;
  successCallback?: ({ password, code }: { password: string; code?: string }) => void;
  requireConfirmationCode?: boolean;
}) {
  const { t } = useTranslation(["password"]);

  const [watchPassword, setWatchPassword] = useState("");

  const validateAndSubmit = async (previousState: FormState, formData: FormData) => {
    const formEntries = {
      password: (formData.get("password") as string) || "",
      confirmPassword: (formData.get("confirmPassword") as string) || "",
      ...((requireConfirmationCode && { code: (formData.get("code") as string) || "" }) || {}),
    };

    // Validate form entries and map any errors to form state with translated messages
    const formEntriesData = Object.fromEntries(formData.entries());
    const validationResult = await validateCreatePassword(
      formEntriesData,
      passwordComplexitySettings,
      requireConfirmationCode
    );

    if (!validationResult.success) {
      return {
        validationErrors: validationResult.issues.map((issue) => ({
          fieldKey: issue.path?.[0].key as string,
          fieldValue: t(`complexity.${issue.message}`),
        })),
        formData: formEntries,
      };
    }

    if (validationResult.success) {
      successCallback?.({
        password: formEntries.password as string,
        ...(requireConfirmationCode ? { code: formEntries.code as string } : {}),
      });
    }

    return previousState;
  };

  const [state, formAction] = useActionState(validateAndSubmit, {
    error: undefined,
    validationErrors: undefined,
    formData: {
      password: "",
      confirmPassword: "",
      ...(requireConfirmationCode ? { code: "" } : {}),
    },
  });

  const getError = (fieldKey: string) => {
    return state.validationErrors?.find((e) => e.fieldKey === fieldKey)?.fieldValue || "";
  };

  const [dirty, setDirty] = useState(false);

  return (
    <>
      <ErrorSummary id="errorSummary" validationErrors={state.validationErrors} />
      <form className="w-full" action={formAction} noValidate onChange={() => setDirty(true)}>
        <div className="mb-4 grid grid-cols-1 gap-4 pt-4">
          {requireConfirmationCode && (
            <GcdsInput
              inputId="code"
              label={t("reset.labels.confirmationCode")}
              type="text"
              name="code"
              autocomplete="one-time-code"
              required
              errorMessage={getError("code")}
            />
          )}

          <div>
            <GcdsInput
              inputId="password"
              label={t("create.labels.password")}
              type="password"
              name="password"
              required
              defaultValue={state.formData?.password ?? ""}
              errorMessage={getError("password")}
              onChange={(e) => setWatchPassword(e.target?.value || "")}
            />

            {/* Password complexity requirements */}
            <div className="mt-2">
              <div className="mb-2 text-sm">
                <I18n i18nKey="create.passwordHint" namespace="password" />
              </div>
              {passwordComplexitySettings && (
                <PasswordComplexity
                  passwordComplexitySettings={passwordComplexitySettings}
                  password={watchPassword}
                  id="password-complexity-requirements"
                  ready={dirty}
                />
              )}
            </div>
          </div>

          <GcdsInput
            inputId="confirmPassword"
            label={t("create.labels.confirmPassword")}
            type="password"
            name="confirmPassword"
            required
            defaultValue={state.formData?.confirmPassword ?? ""}
            errorMessage={getError("confirmPassword")}
          />
        </div>

        <SubmitButtonAction>{t("button.continue", { ns: "common" })}</SubmitButtonAction>
      </form>
    </>
  );
}
