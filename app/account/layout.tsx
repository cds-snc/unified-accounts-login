/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsFooter, GcdsHeader } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { serverTranslation } from "@i18n/server";
import { Logout } from "@components/auth/Logout";
// Note: This is a single column layout as we don't need the left nav yet.

export default async function Layout({ children }: { children: React.ReactNode }) {
  const {
    i18n: { language },
  } = await serverTranslation();

  return (
    <div className="min-h-screen bg-gray-soft">
      <GcdsHeader lang={language} langHref={language === "en" ? "/fr" : "/en"}>
        <div className="flex items-center gap-4">
          <Logout className="mr-2 text-sm" />
        </div>
      </GcdsHeader>
      <main className="mx-auto max-w-[71.25rem] px-6 py-2 laptop:px-0">
        <div className="mb-20 px-16">{children}</div>
      </main>
      <GcdsFooter display="compact" />
    </div>
  );
}
