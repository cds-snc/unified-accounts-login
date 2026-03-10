/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import * as Tooltip from "@radix-ui/react-tooltip";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { getSiteConfigFromHeaders } from "@lib/server/site-config";
import { getSiteLink } from "@lib/site-config";
import { serverTranslation } from "@i18n/server";
import { Logout } from "@components/auth/Logout";
import { Footer } from "@components/layout/footer/Footer";
import { GcdsHeader } from "@components/layout/gcds-header/GcdsHeader";
import { SiteLink } from "@components/layout/site-header/SiteLink";
import { ToastContainer } from "@components/ui/toast/Toast";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = await getSiteConfigFromHeaders();
  const {
    t,
    i18n: { language },
  } = await serverTranslation(["fip", "footer"]);

  const contextualLinks = {
    [t("about.desc", { ns: "footer" })]: getSiteLink(siteConfig, "about", language),
    [t("terms-of-use.desc", { ns: "footer" })]: getSiteLink(siteConfig, "termsOfUse", language),
    [t("sla.desc", { ns: "footer" })]: getSiteLink(siteConfig, "sla", language),
  };

  return (
    <div className="flex min-h-full flex-col bg-gray-soft">
      <GcdsHeader>
        <div className="inline-block">
          <Logout className="mr-2 text-sm" />
        </div>
      </GcdsHeader>

      <div id="page-container" className="gc-authpages">
        <div className="account-wrapper mt-10 flex items-center justify-center">
          <div
            className={`rounded-2xl border-1 border-[#D1D5DB] bg-white p-10 tablet:w-[658px] has-[#auth-panel-wide]:tablet:w-[950px] laptop:w-[850px] has-[#auth-panel-wide]:laptop:w-[1200px]`}
          >
            <main id="content">
              <div className="mb-6 mr-10 inline-flex">
                <SiteLink href={getSiteLink(siteConfig, "about", language)} />
              </div>
              <Tooltip.Provider>{children}</Tooltip.Provider>
              <ToastContainer autoClose={false} containerId="default" />
            </main>
          </div>
        </div>
      </div>
      <Footer
        contextualHeading={t("ariaLabel", { ns: "footer" })}
        contextualLinks={contextualLinks}
      />
    </div>
  );
}
