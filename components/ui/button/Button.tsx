"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { type JSX, ReactElement } from "react";
import { GcdsButton } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { useTranslation } from "@i18n/client";
import { SpinnerIcon } from "@components/icons/SpinnerIcon";

type ButtonRole = "primary" | "secondary" | "danger" | "destructive" | "link" | "icon";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: ReactElement;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  theme?: ButtonRole;
  tabIndex?: number;
  buttonRef?: (el: HTMLButtonElement) => void;
  dataTestId?: string;
  loading?: boolean;
  [key: string]: unknown;
}

const themeToButtonRole = (theme: ButtonRole): "primary" | "secondary" | "danger" => {
  if (theme === "destructive" || theme === "danger") return "danger";
  if (theme === "secondary" || theme === "link" || theme === "icon") return "secondary";
  return "primary";
};

export const Button = ({
  type = "button",
  children,
  onClick,
  className,
  disabled = false,
  "aria-label": ariaLabel,
  theme = "primary",
  dataTestId,
  loading = false,
  ...rest
}: ButtonProps) => {
  const { t } = useTranslation("common");

  return (
    <GcdsButton
      type={type}
      buttonRole={themeToButtonRole(theme)}
      disabled={disabled || loading}
      onClick={onClick as (e: React.MouseEvent<HTMLElement>) => void}
      className={className}
      data-testid={dataTestId}
      aria-label={ariaLabel}
      {...(rest as Record<string, unknown>)}
    >
      {children}
      {loading && (
        <SpinnerIcon className="ml-2 size-7 animate-spin fill-blue-600 text-white dark:text-white" />
      )}
      <div aria-live="polite" className="sr-only">
        {loading && `${t("loadingResult")}`}
      </div>
    </GcdsButton>
  );
};

export const RoundedButton = ({ className, ...props }: ButtonProps) => (
  <Button {...props} className={className} />
);
