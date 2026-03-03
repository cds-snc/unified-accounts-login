"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { GcdsInput, GcdsLink } from "@gcds-core/components-react";

import { getSafeErrorMessage } from "@lib/safeErrorMessage";
/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const genericLoginError = t("validation.invalidCredentials", { ns: "start" });

  const localFormAction = async (previousState: FormState, _formDataFromForm?: FormData) => {
    setLoading(true);

    // Use controlled state values instead of FormData
    const username = formData.username;
    const password = formData.password;

    // Create FormData-like object for validation
    const formEntriesData = {
      username,
      password,
    };
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

    const response = await submitLoginForm({
      username: username,
      password: password,
      requestId,
    })
      .catch(() => {
        return {
          error: t("validation.invalidCredentials"),
        };
      })
      .finally(() => {
        setLoading(false);
      });

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
    return state.validationErrors?.find((e) => e.fieldKey === fieldKey)?.fieldValue || "";
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
            label={t("form.label")}
            hint={t("form.description")}
            type="email"
            name="username"
            autocomplete="email"
            required
            value={formData.username}
            onInput={(e) =>
              setFormData((prev) => ({ ...prev, username: (e.target as HTMLInputElement).value }))
            }
            errorMessage={getError("username")}
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <GcdsInput
            inputId="password"
            label={t("form.passwordLabel")}
            type="password"
            name="password"
            autocomplete="current-password"
            required
            value={formData.password}
            onInput={(e) =>
              setFormData((prev) => ({ ...prev, password: (e.target as HTMLInputElement).value }))
            }
            errorMessage={getError("password")}
          />

          {/* Forgot password link */}
          <div className="mt-2">
            <GcdsLink href={buildUrlWithRequestId("/password/reset", requestId)} size="small">
              {t("form.forgotPasswordLink")}
            </GcdsLink>
          </div>
        </div>

        <SubmitButtonAction disabled={loading}>
          {loading ? t("form.signingIn") : t("form.submit")}
        </SubmitButtonAction>
      </form>
    </div>
  );
}
