"use client";
/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { useTranslation } from "@i18n";
export const SiteLogo = ({ className }: { className?: string }) => {
  const { t } = useTranslation("header");
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>{t("title")}</title>
      {/* Shield background */}
      <path
        d="M22.5 2L4 10v12c0 10.5 7.9 20.3 18.5 23C33.1 42.3 41 32.5 41 22V10L22.5 2Z"
        fill="#F0EEFC"
        stroke="#1B00C2"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Lock body */}
      <rect x="15" y="22" width="15" height="11" rx="2" fill="#1B00C2" />
      {/* Lock shackle */}
      <path
        d="M17.5 22v-4a5 5 0 0 1 10 0v4"
        stroke="#1B00C2"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="22.5" cy="27" r="2" fill="#F0EEFC" />
      <rect x="21.5" y="27" width="2" height="3" rx="1" fill="#F0EEFC" />
    </svg>
  );
};
