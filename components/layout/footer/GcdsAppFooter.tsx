"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsFooter } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { useTranslation } from "@i18n/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export const GcdsAppFooter = () => {
  const { t, i18n } = useTranslation("footer");
  const language = i18n.language;

  const contextualLinks = {
    [t("about.desc")]: `${APP_URL}/${language}/about`,
    [t("terms-of-use.desc")]: `${APP_URL}/${language}/terms-of-use`,
    [t("sla.desc")]: `${APP_URL}/${language}/sla`,
  };

  return (
    <GcdsFooter
      display="compact"
      contextualHeading={t("contextualHeading")}
      contextualLinks={contextualLinks}
      lang={language}
    />
  );
};
