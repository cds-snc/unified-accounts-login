"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useRouter } from "next/navigation";
import { GcdsButton } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { I18n } from "@i18n";

export function BackButton({ ...rest }: Record<string, unknown>) {
  const router = useRouter();
  return (
    <GcdsButton buttonRole="secondary" type="button" onClick={() => router.back()} {...rest}>
      <I18n i18nKey="button.back" namespace="common" />
    </GcdsButton>
  );
}
