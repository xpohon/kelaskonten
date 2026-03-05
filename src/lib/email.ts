import { Resend } from "resend";

interface ArticleNotificationParams {
  title: string;
  category: string;
  excerpt: string;
  articleId: string;
}

export async function sendArticleNotification({
  title,
  category,
  excerpt,
  articleId,
}: ArticleNotificationParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to || !apiKey) {
    console.log("Email notification skipped: RESEND_API_KEY or NOTIFICATION_EMAIL not set");
    return { success: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://kelaskonten.id"}/admin/blog`;

  const { error } = await resend.emails.send({
    from: "KelasKonten <onboarding@resend.dev>",
    to: [to],
    subject: `[Draft Baru] ${title}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <span style="display: inline-block; background: #10b981; color: white; font-size: 12px; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px;">${category}</span>
          <span style="display: inline-block; background: #8b5cf6; color: white; font-size: 12px; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; margin-left: 4px;">AI Generated</span>
          <h2 style="margin: 8px 0 12px; color: #111827; font-size: 20px;">${title}</h2>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">${excerpt}</p>
        </div>
        <a href="${adminUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Review & Approve di Admin</a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">Artikel ini di-generate otomatis oleh AI dan menunggu approval Anda sebelum dipublikasikan.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Email notification failed:", error);
    return { success: false, reason: error.message };
  }

  return { success: true };
}
