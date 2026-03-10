"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GcdsInput } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { getSiteLink, SiteConfig } from "@lib/site-config";
import { buildUrlWithRequestId } from "@lib/utils";
import { validateAccount } from "@lib/validationSchemas";
import { useTranslation } from "@i18n";
import { SubmitButtonAction } from "@components/ui/button/SubmitButton";
import { ErrorSummary } from "@components/ui/form/ErrorSummary";

/*--------------------------------------------*
 * Parent Relative
 *--------------------------------------------*/
import { useRegistration } from "../context/RegistrationContext";

type FormState = {
  error?: string;
  validationErrors?: { fieldKey: string; fieldValue: string }[];
  formData?: {
    firstname?: string;
    lastname?: string;
    email?: string;
  };
};

type Props = {
  organization: string;
  requestId?: string;
  siteConfig: SiteConfig;
};

export function RegisterForm({ organization, requestId, siteConfig }: Props) {
  const { t, i18n } = useTranslation(["register", "validation", "errorSummary", "common"]);
  const { setRegistrationData } = useRegistration();
  const router = useRouter();

  const localFormAction = async (previousState: FormState, formData: FormData) => {
    const formEntries = {
      firstname: (formData.get("firstname") as string) || "",
      lastname: (formData.get("lastname") as string) || "",
      email: (formData.get("email") as string) || "",
    };

    // Validate form entries and map any errors to form state with translated messages
    const formEntriesData = Object.fromEntries(formData.entries());
    const validationResult = await validateAccount(formEntriesData);
    if (!validationResult.success) {
      return {
        validationErrors: validationResult.issues.map((issue) => ({
          fieldKey: issue.path?.[0].key as string,
          fieldValue: t(`validation.${issue.message}`),
        })),
        formData: formEntries,
      };
    }

    // Store registration data in context (persisted to sessionStorage)
    setRegistrationData({
      ...validationResult.output,
      ...(organization && { organization }),
      ...(requestId && { requestId }),
    });
    router.push(buildUrlWithRequestId("/register/password", requestId));

    return previousState;
  };

  const [state, formAction] = useActionState(localFormAction, {
    validationErrors: undefined,
    formData: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const getError = (fieldKey: string) => {
    return state.validationErrors?.find((e) => e.fieldKey === fieldKey)?.fieldValue || "";
  };

  return (
    <>
      <ErrorSummary id="errorSummary" validationErrors={state.validationErrors} />
      <form action={formAction} noValidate>
        <div className="mb-4 flex flex-col gap-4">
          <GcdsInput
            inputId="firstname"
            name="firstname"
            label={t("labels.firstname")}
            type="text"
            required
            autocomplete="given-name"
            value={state.formData?.firstname ?? ""}
            errorMessage={getError("firstname") || undefined}
          />
          <GcdsInput
            inputId="lastname"
            name="lastname"
            label={t("labels.lastname")}
            type="text"
            required
            autocomplete="family-name"
            value={state.formData?.lastname ?? ""}
            errorMessage={getError("lastname") || undefined}
          />
          <GcdsInput
            inputId="email"
            name="email"
            label={t("labels.email")}
            hint={t("emailInputHint")}
            type="email"
            required
            autocomplete="email"
            value={state.formData?.email ?? ""}
            errorMessage={getError("email") || undefined}
          />
        </div>

        <p className="-mt-2 mb-10">
          {t("terms.agreement")}
          <Link href={getSiteLink(siteConfig, "termsOfUse", i18n.language)}>
            {t("terms.linkText")}
          </Link>
        </p>

        <div>
          <SubmitButtonAction>{t("button.continue", { ns: "common" })}</SubmitButtonAction>
        </div>
      </form>
    </>
  );
}
