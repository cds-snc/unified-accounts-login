/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsButton, GcdsLink } from "@gcds-core/components-react";
import type { JSX } from "react";

type LinkButtonProps = {
  href: string;
  children: JSX.Element | string;
  className?: string;
  scroll?: boolean;
  title?: string;
  onClick?: () => void;
  isActive?: boolean;
  testid?: string;
  target?: string;
  "aria-describedby"?: string;
  "data-testid"?: string;
};

export const Default = ({ href, children }: LinkButtonProps) => {
  return (
    <GcdsLink href={href} size="regular">
      {children}
    </GcdsLink>
  );
};

export const Primary = ({
  href,
  children,
  target,
  "aria-describedby": ariaDescribedby,
  "data-testid": dataTestId,
}: LinkButtonProps) => {
  return (
    <GcdsButton
      type="link"
      buttonRole="primary"
      href={href}
      target={target}
      data-testid={dataTestId}
      {...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {})}
    >
      {children}
    </GcdsButton>
  );
};

export const Secondary = ({
  href,
  children,
  target,
  "aria-describedby": ariaDescribedby,
  "data-testid": dataTestId,
}: LinkButtonProps) => {
  return (
    <GcdsButton
      type="link"
      buttonRole="secondary"
      href={href}
      target={target}
      data-testid={dataTestId}
      {...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {})}
    >
      {children}
    </GcdsButton>
  );
};

export const LinkButton = {
  Primary,
  Secondary,
};
