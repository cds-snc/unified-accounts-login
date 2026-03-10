/**
 * Manual mock for @gcds-core/components-react.
 * Stencil web components use shadow DOM which jsdom does not support.
 * These thin wrappers render equivalent accessible HTML so tests can use
 * queries like getByLabelText, getByRole, etc.
 */
import React from "react";

type InputProps = {
  inputId?: string;
  name?: string;
  label?: string;
  hint?: string;
  errorMessage?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  autocomplete?: string;
  hideLabel?: boolean;
  onGcdsInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGcdsChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGcdsBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
};

export const GcdsInput = ({
  inputId,
  name,
  label,
  hint,
  errorMessage,
  type = "text",
  required,
  disabled,
  value,
  autocomplete,
  onGcdsInput,
  onGcdsChange,
  ...rest
}: InputProps) => {
  const id = inputId ?? name;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {hint && <span id={hintId}>{hint}</span>}
      {errorMessage && (
        <span id={errorId} role="alert">
          {errorMessage}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        defaultValue={value}
        autoComplete={autocomplete}
        aria-describedby={describedBy}
        onChange={(e) => {
          onGcdsInput?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
          onGcdsChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
        }}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
};

type ButtonProps = {
  type?: "submit" | "reset" | "button" | "link";
  buttonRole?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  size?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
};

export const GcdsButton = ({
  type = "button",
  buttonRole,
  disabled,
  href,
  children,
  onClick,
  className,
  ...rest
}: ButtonProps) => {
  if (type === "link" && href) {
    return (
      <a
        href={href}
        className={className}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type === "link" ? "button" : type}
      disabled={!!disabled}
      aria-disabled={disabled ? "true" : "false"}
      onClick={onClick}
      className={className}
      data-button-role={buttonRole}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

type LinkProps = {
  href: string;
  linkRole?: string;
  size?: string;
  display?: string;
  external?: boolean;
  target?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const GcdsLink = ({ href, children, className, target, ...rest }: LinkProps) => (
  <a
    href={href}
    className={className}
    target={target}
    {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
  >
    {children}
  </a>
);

type HeadingProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headingRole?: string;
  marginTop?: string;
  marginBottom?: string;
  characterLimit?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const GcdsHeading = ({ tag: Tag = "h1", children, className }: HeadingProps) => (
  <Tag className={className}>{children}</Tag>
);

type TextProps = {
  textRole?: string;
  size?: string;
  display?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const GcdsText = ({ children, className, ...rest }: TextProps) => (
  <p className={className} {...(rest as React.HTMLAttributes<HTMLParagraphElement>)}>
    {children}
  </p>
);

type HeaderProps = {
  langHref?: string;
  signatureHasLink?: boolean;
  skipToHref?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const GcdsHeader = ({ children }: HeaderProps) => (
  <header data-testid="gcds-header">{children}</header>
);

type FooterProps = {
  display?: string;
  contextualHeading?: string;
  contextualLinks?: string | Record<string, string>;
  subLinks?: string | Record<string, string>;
  [key: string]: unknown;
};

export const GcdsFooter = ({ contextualHeading }: FooterProps) => (
  <footer data-testid="gcds-footer">{contextualHeading && <span>{contextualHeading}</span>}</footer>
);

type LangToggleProps = {
  href: string;
  [key: string]: unknown;
};

export const GcdsLangToggle = ({ href }: LangToggleProps) => (
  <a href={href} lang="fr">
    Français
  </a>
);
