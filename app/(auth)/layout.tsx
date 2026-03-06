/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import * as Tooltip from "@radix-ui/react-tooltip";
import { GcdsFooter, GcdsHeader } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { I18n } from "@i18n";
import { serverTranslation } from "@i18n/server";
import { Logout } from "@components/auth/Logout";
import { SiteLogo } from "@components/icons/SiteLogo";
import { ToastContainer } from "@components/ui/toast/Toast";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const {
    i18n: { language },
  } = await serverTranslation(["fip"]);

  const langHref = language === "en" ? "/fr" : "/en";

  return (
    <div className="flex min-h-full flex-col bg-gray-soft">
      <GcdsHeader 
        signatureHasLink
        langHref={langHref}
      >
        <div className="flex items-center" slot="menu">
          <Logout className="text-sm" />
        </div>
      </GcdsHeader>

      <div id="page-container" className="gc-authpages">
        <div className="account-wrapper mt-10 flex items-center justify-center">
          <div
            className={`rounded-2xl border-1 border-[#D1D5DB] bg-white p-10 tablet:w-[658px] has-[#auth-panel-wide]:tablet:w-[950px] laptop:w-[850px] has-[#auth-panel-wide]:laptop:w-[1200px]`}
          >
            <main id="content">
              <a
                className="mb-6 mr-10 flex items-center no-underline focus:bg-white hover:no-underline"
                href={`${APP_URL}/${language}/about`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiteLogo className="flex-shrink-0" />
                <span className="ml-3 text-[24px] font-semibold text-[#1B00C2] leading-none">
                  <I18n i18nKey="title" namespace="common" />
                </span>
              </a>
              <Tooltip.Provider>{children}</Tooltip.Provider>
              <ToastContainer autoClose={false} containerId="default" />
            </main>
          </div>
        </div>
      </div>
      <GcdsFooter display="compact" />
    </div>
  );
}
