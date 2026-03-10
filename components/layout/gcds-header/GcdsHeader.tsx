"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsHeader as OfficialGcdsHeader } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import LanguageToggle from "@components/ui/language-toggle/LanguageToggle";

export const GcdsHeader = ({
  children,
  skipToHref = "#content",
}: {
  children?: React.ReactNode;
  skipToHref?: string;
}) => {
  return (
    <OfficialGcdsHeader skipToHref={skipToHref}>
      <div slot="toggle" className="flex items-center gap-2">
        {children}
        <LanguageToggle />
      </div>
    </OfficialGcdsHeader>
  );
};
