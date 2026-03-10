"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { GcdsInput, GcdsLink } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { getSafeErrorMessage } from "@lib/safeErrorMessage";
import { buildUrlWithRequestId } from "@lib/utils";
import { validateUsernameAndPassword } from "@lib/validationSchemas";
import { useTranslation } from "@i18n";
import { SubmitButtonAction } from "@components/ui/button/SubmitButton";
import { Alert, ErrorStatus } from "@components/ui/form";
import { ErrorSummary } from "@components/ui/form/ErrorSummary";

/*--------------------------------------------*
 * Parent Relative
 *--------------------------------------------*/
import { submitLoginForm } from "../actions";
type Props = {
  requestId?: string;
  organization?: string;
};

type FormState = {
  formData: {
    username: string;
    password: string;
  };
  error?: string;
  validationErrors?: { fieldKey: string; fieldValue: string }[];
};

export function LoginForm({ requestId }: Props) {
  const { t } = useTranslation(["start", "common"]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const genericLoginError = t("validation.invalidCredentials", { ns: "start" });

  const localFormAction = async (previousState: FormState, formData?: FormData) => {
    setLoading(true);

    const username = (formData?.get("username") as string) || "";
    const password = formData?.get("password") as string;

    // Validate form entries and map any errors to form state with translated messages
    const formEntriesData = formData ? Object.fromEntries(formData.entries()) : {};
    const validationResult = await validateUsernameAndPassword(formEntriesData);

    if (!validationResult.success) {
      setLoading(false);
      return {
        ...previousState,
        validationErrors: validationResult.issues.map((issue) => ({
          fieldKey: issue.path?.[0].key as string,
          fieldValue: t(`validation.${issue.message}`, { ns: "start" }),
        })),
        formData: {
          username: username,
          password: password,
        },
      };
    }

    let response;
    try {
      response = await submitLoginForm({
        username: username,
        password: password,
        requestId,
      });
    } catch (e) {
      response = {
        error: t("validation.invalidCredentials"),
      };
    }
    setLoading(false);

    if (response && "error" in response && response.error) {
      return {
        ...previousState,
        validationErrors: undefined,
        error: response.error,
        formData: { username, password: "" },
      };
    }

    if (response && "redirect" in response && response.redirect) {
      router.push(response.redirect);
    }

    return previousState;
  };

  const [state, formAction] = useActionState(localFormAction, {
    formData: {
      username: "",
      password: "",
    },
  });

  // Helper to get field error
  const getError = (fieldKey: string) => {
    return state.validationErrors?.find((e) => e.fieldKey === fieldKey)?.fieldValue || undefined;
  };

  return (
    <div>
      <ErrorSummary id="errorSummary" validationErrors={state.validationErrors} />

      {state.error && (
        <div className="py-4" data-testid="error">
          <Alert type={ErrorStatus.ERROR} focussable={true} id="loginError">
            {getSafeErrorMessage({
              error: state.error,
              fallback: genericLoginError,
              allowedMessages: [genericLoginError],
            })}
          </Alert>
        </div>
      )}

      <form id="login" action={formAction} noValidate>
        {/* Username field */}
        <div className="mb-4">
          <GcdsInput
            inputId="username"
            name="username"
            label={t("form.label", { ns: "start" })}
            hint={t("form.description", { ns: "start" })}
            type="email"
            required
            autocomplete="email"
            value={state.formData?.username || ""}
            errorMessage={getError("username")}
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <GcdsInput
            inputId="password"
            name="password"
            label={t("form.passwordLabel", { ns: "start" })}
            type="password"
            required
            autocomplete="current-password"
            errorMessage={getError("password")}
          />

          {/* Forgot password link */}
          <div className="mt-2">
            <GcdsLink href={buildUrlWithRequestId("/password/reset", requestId)}>
              {t("form.forgotPasswordLink", { ns: "start" })}
            </GcdsLink>
          </div>
        </div>

        <SubmitButtonAction disabled={loading}>
          {loading ? t("form.signingIn", { ns: "start" }) : t("form.submit", { ns: "start" })}
        </SubmitButtonAction>
      </form>
    </div>
  );
}
