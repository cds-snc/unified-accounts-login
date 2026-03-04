"use client";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { GcdsLink } from "@gcds-core/components-react";

import { I18n } from "@i18n";
import { useTranslation } from "@i18n/client";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

const BulletPoint = () => {
  return <span className="px-3">&#x2022;</span>;
};

export const FooterLinks = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <span className="mr-10 inline-block">
      <GcdsLink href={`${APP_URL}/${locale}/about`} external>
        <I18n i18nKey="about.desc" namespace="footer" />
      </GcdsLink>
      <BulletPoint />
      <GcdsLink href={`${APP_URL}/${locale}/terms-of-use`}>
        <I18n i18nKey="terms-of-use.desc" namespace="footer" />
      </GcdsLink>
      <BulletPoint />
      <GcdsLink href={`${APP_URL}/${locale}/sla`}>
        <I18n i18nKey="sla.desc" namespace="footer" />
      </GcdsLink>
    </span>
  );
};
