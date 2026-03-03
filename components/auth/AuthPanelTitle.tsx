/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { GcdsHeading } from "@gcds-core/components-react";

import { I18n } from "@i18n";
export const AuthPanelTitle = ({
  i18nKey,
  namespace,
  data,
  className,
}: {
  i18nKey: string;
  namespace: string;
  data?: Record<string, unknown>;
  className?: string;
}) => {
  return (
    <div className={`mt-4 ${className || ""}`.trim()}>
      <GcdsHeading tag="h1" marginBottom="400">
        <I18n i18nKey={i18nKey} namespace={namespace} data={data} />
      </GcdsHeading>
    </div>
  );
};
