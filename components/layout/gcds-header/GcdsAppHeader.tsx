"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useEffect, useRef } from "react";
import { GcdsHeader } from "@gcds-core/components-react";
import type { GcdsHeader as GcdsHeaderElement } from "@gcds-core/components/dist/components/gcds-header.js";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import LanguageToggle from "@components/ui/language-toggle/LanguageToggle";

export const GcdsAppHeader = ({ children }: { children?: React.ReactNode }) => {
  const headerRef = useRef<GcdsHeaderElement>(null);

  // Force Stencil to re-render after React hydration so slot detection works
  useEffect(() => {
    const el = headerRef.current;
    if (el) {
      el.removeAttribute("lang-href");
      el.setAttribute("skip-to-href", "#content");
    }
  }, []);

  return (
    <GcdsHeader ref={headerRef} skipToHref="#content" signatureHasLink>
      <div slot="toggle">
        <div className="brand__toggle flex items-center gap-2">
          {children}
          <LanguageToggle />
        </div>
      </div>
    </GcdsHeader>
  );
};
