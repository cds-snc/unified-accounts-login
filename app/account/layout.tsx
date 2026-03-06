/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsHeader, GcdsFooter } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { serverTranslation } from "@i18n/server";
import { Logout } from "@components/auth/Logout";
import LanguageToggle from "@components/ui/language-toggle/LanguageToggle";
// Note: This is a single column layout as we don't need the left nav yet.

export default async function Layout({ children }: { children: React.ReactNode }) {
  const {
    i18n: { language },
  } = await serverTranslation(["common"]);

  const langHref = language === "en" ? "/fr" : "/en";

  return (
    <div className="min-h-screen bg-gray-soft">
      <GcdsHeader 
        signatureHasLink
        langHref={langHref}
      >
        <div className="flex items-center" slot="menu">
          <Logout className="text-sm" />
        </div>
      </GcdsHeader>
      <main id="main-content" className="mx-auto max-w-[71.25rem] px-6 py-2 laptop:px-0">
        <div className="mb-20 px-16">{children}</div>
      </main>
      <GcdsFooter display="compact" />
    </div>
  );
}
