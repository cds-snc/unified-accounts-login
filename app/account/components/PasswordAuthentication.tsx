"use client";
/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsHeading } from "@gcds-core/components-react";
import { useTranslation } from "react-i18next";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { LinkButton } from "@components/ui/button/LinkButton";
export const PasswordAuthentication = () => {
  const { t } = useTranslation("account");

  return (
    <>
      <div className="rounded-2xl border-1 border-[#D1D5DB] bg-white p-6">
        <div className="flex items-center justify-between">
          <GcdsHeading tag="h3" marginBottom="600">
            {t("authentication.title")}
          </GcdsHeading>
          <div>
            <LinkButton.Primary href="/password/change">
              {t("authentication.change")}
            </LinkButton.Primary>
          </div>
        </div>
        <div>
          <div className="mb-1 font-semibold">{t("authentication.password")}</div>
          {/* Placeholder password characters used instead of real password for security reasons */}
          <div>
            &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
          </div>
        </div>
      </div>
    </>
  );
};
