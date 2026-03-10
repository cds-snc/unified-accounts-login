"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsHeader } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import LanguageToggle from "@components/ui/language-toggle/LanguageToggle";

export const SiteHeader = ({
  children,
  skipToHref = "#content",
}: {
  children?: React.ReactNode;
  skipToHref?: string;
}) => {
  return (
    <GcdsHeader skipToHref={skipToHref}>
      <div slot="toggle" className="flex items-center gap-2">
        {children}
        <LanguageToggle />
      </div>
    </GcdsHeader>
  );
};
