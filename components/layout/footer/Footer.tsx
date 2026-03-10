"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsFooter } from "@gcds-core/components-react";

export const Footer = ({
  contextualHeading,
  contextualLinks,
  display = "full",
}: {
  contextualHeading: string;
  contextualLinks: Record<string, string>;
  display?: "compact" | "full";
}) => {
  return (
    <GcdsFooter
      data-testid="footer"
      display={display}
      contextualHeading={contextualHeading}
      contextualLinks={contextualLinks}
    />
  );
};
