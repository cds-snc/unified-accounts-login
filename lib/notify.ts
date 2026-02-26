/**
 * Thin wrapper around the GC Notify REST API.
 * Replaces the @gcforms/connectors package dependency so this portal
 * can be used by any CDS project without importing a Forms-team-specific package.
 *
 * Docs: https://documentation.notification.canada.ca/en/send.html#send-an-email
 */

import type { GCNotifyTemplate } from "./emailTemplates";

const GC_NOTIFY_API_URL = "https://api.notification.canada.ca/v2/notifications/email";

/**
 * Send an email via GC Notify.
 *
 * @param apiKey    - GC Notify API key (from NOTIFY_API_KEY env var)
 * @param email     - Recipient email address
 * @param templateId - GC Notify template ID (from TEMPLATE_ID env var)
 * @param personalisation - Key/value pairs matching the template's variables
 */
export async function sendNotifyEmail(
  apiKey: string,
  email: string,
  templateId: string,
  personalisation: GCNotifyTemplate
): Promise<void> {
  const response = await fetch(GC_NOTIFY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `ApiKey-v1 ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      template_id: templateId,
      personalisation,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "(no body)");
    throw new Error(
      `GC Notify request failed: ${response.status} ${response.statusText} — ${body}`
    );
  }
}
