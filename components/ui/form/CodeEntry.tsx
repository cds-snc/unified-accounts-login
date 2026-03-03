/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { GcdsInput } from "@gcds-core/components-react";

import { useTranslation } from "@i18n/client";

/*--------------------------------------------*
 * Local Relative
 *--------------------------------------------*/
type FormState = {
  error?: string;
  validationErrors?: { fieldKey: string; fieldValue: string }[];
  formData?: Record<string, string>;
};

// Pulls the error keys out of form state. Note that the validationErrors must be
// populated with the translated strings for this to work.
const getError = (fieldKey: string, state: FormState) => {
  return state.validationErrors?.find((e) => e.fieldKey === fieldKey)?.fieldValue || "";
};

export const CodeEntry = ({
  state,
  code,
  onCodeChange,
  className,
}: {
  state: FormState;
  code?: string;
  onCodeChange?: (value: string) => void;
  className?: string;
}) => {
  const { t } = useTranslation("verify");

  return (
    <div className={className}>
      <GcdsInput
        inputId="code"
        label={t("label")}
        hint={t("hint")}
        type="text"
        name="code"
        value={code ?? ""}
        autocomplete="one-time-code"
        errorMessage={getError("code", state)}
        onInput={(e) => onCodeChange?.((e.target as HTMLInputElement).value)}
        required
      />
    </div>
  );
};
