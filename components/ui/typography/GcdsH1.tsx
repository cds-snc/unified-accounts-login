/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { GcdsHeading } from "@gcds-core/components-react";

export const GcdsH1 = ({
  children,
  tabIndex,
  className,
}: {
  children: React.ReactNode;
  tabIndex?: number;
  className?: string;
}) => {
  return (
    <GcdsHeading tag="h1" {...(tabIndex !== undefined ? { tabIndex } : {})} className={className}>
      {children}
    </GcdsHeading>
  );
};
