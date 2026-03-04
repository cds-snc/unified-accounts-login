"use client";

/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useEffect } from "react";
import Image from "next/image";
import { GcdsFooter, GcdsHeader, GcdsHeading } from "@gcds-core/components-react";

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
    <div className="flex min-h-full flex-col bg-gray-soft">
      <GcdsHeader lang="en" />
      <main className="grow">
        <div className="container mx-auto px-4 py-8">
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
      </main>
      <GcdsFooter display="compact" />
    </div>
  );
}
