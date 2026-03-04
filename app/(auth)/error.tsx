"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useEffect } from "react";
import Image from "next/image";
import { GcdsHeading } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { getImageUrl } from "@lib/imageUrl";
import { I18n } from "@i18n";
export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="">
      <div className="text-center">
        <GcdsHeading tag="h1" marginBottom="600" marginTop="800">
          <I18n i18nKey="title" namespace="error" />
        </GcdsHeading>
        <Image
          src={getImageUrl("/img/goose.png")}
          alt="Goose"
          width={200}
          height={200}
          className="mx-auto mb-6"
          priority
        />
      </div>
    </div>
  );
}
