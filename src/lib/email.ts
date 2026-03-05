import { Resend } from "resend";

// --- Helpers ---

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://kelaskonten.id";
}

const FROM = "KelasKonten <onboarding@resend.dev>";

function emailWrapper(content: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111827;">
      <div style="border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 24px;">
        <strong style="font-size: 18px; color: #10b981;">Kelas</strong><strong style="font-size: 18px; color: #111827;">Konten</strong>
      </div>
      ${content}
      <div style="border-top: 1px solid #e5e7eb; margin-top: 24px; padding-top: 16px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Email ini dikirim otomatis oleh KelasKonten. Jangan balas email ini.</p>
      </div>
    </div>
  `;
}

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

async function sendEmail(to: string, subject: string, html: string): Promise<{ success: boolean }> {
  const resend = getResend();
  if (!resend) {
    console.log(`Email skipped (not configured): ${subject}`);
    return { success: false };
  }
  try {
    const { error } = await resend.emails.send({ from: FROM, to: [to], subject, html });
    if (error) {
      console.error(`Email failed [${subject}]:`, error);
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error(`Email error [${subject}]:`, err);
    return { success: false };
  }
}

// --- Shared interface ---

interface OrderEmailParams {
  to: string;
  clientName: string;
  serviceType: string;
  packageName: string;
  price: number;
  orderId: string;
}

// --- Article notification (existing) ---

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
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return { success: false, reason: "not_configured" };

  const adminUrl = `${siteUrl()}/admin/blog`;
  return sendEmail(to, `[Draft Baru] ${title}`, emailWrapper(`
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <span style="display: inline-block; background: #10b981; color: white; font-size: 12px; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px;">${category}</span>
      <span style="display: inline-block; background: #8b5cf6; color: white; font-size: 12px; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; margin-left: 4px;">AI Generated</span>
      <h2 style="margin: 8px 0 12px; color: #111827; font-size: 20px;">${title}</h2>
      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">${excerpt}</p>
    </div>
    <a href="${adminUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Review & Approve di Admin</a>
    <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">Artikel ini di-generate otomatis oleh AI dan menunggu approval Anda sebelum dipublikasikan.</p>
  `));
}

// --- Order transactional emails ---

export async function sendOrderCreated(params: OrderEmailParams) {
  const paymentUrl = `${siteUrl()}/pembayaran/${params.orderId}`;
  return sendEmail(params.to, `[Order Baru] ${params.serviceType} - ${params.packageName}`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Order Berhasil Dibuat!</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, order Anda telah kami terima.</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="color: #6b7280; padding: 4px 0;">Layanan</td><td style="text-align: right; font-weight: 600;">${params.serviceType}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Paket</td><td style="text-align: right; font-weight: 600;">${params.packageName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Harga</td><td style="text-align: right; font-weight: 600; color: #10b981;">${formatPrice(params.price)}</td></tr>
      </table>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Silakan lakukan pembayaran untuk memulai pengerjaan.</p>
    <a href="${paymentUrl}" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">Bayar Sekarang</a>
  `));
}

export async function sendPaymentConfirmed(params: OrderEmailParams) {
  const dashboardUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(params.to, `[Pembayaran Diterima] ${params.serviceType} - ${params.packageName}`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Pembayaran Diterima!</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, pembayaran Anda untuk <strong>${params.serviceType} - ${params.packageName}</strong> sebesar <strong>${formatPrice(params.price)}</strong> telah kami terima.</p>
    <div style="background: #ecfdf5; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #10b981;">
      <p style="margin: 0; font-size: 14px; color: #065f46;"><strong>Langkah selanjutnya:</strong> Admin akan menyiapkan scope pekerjaan untuk Anda review dan setujui.</p>
    </div>
    <a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Lihat Order</a>
  `));
}

export async function sendPaymentNotifAdmin(params: Omit<OrderEmailParams, "to">) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return { success: false };
  const adminUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(to, `[Payment] ${params.clientName} - ${params.serviceType} ${params.packageName}`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Pembayaran Masuk!</h2>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="color: #6b7280; padding: 4px 0;">Klien</td><td style="text-align: right; font-weight: 600;">${params.clientName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Layanan</td><td style="text-align: right; font-weight: 600;">${params.serviceType} - ${params.packageName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Nominal</td><td style="text-align: right; font-weight: 600; color: #10b981;">${formatPrice(params.price)}</td></tr>
      </table>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Silakan siapkan scope pekerjaan untuk order ini.</p>
    <a href="${adminUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Buka Order</a>
  `));
}

export async function sendScopeApproved(params: OrderEmailParams) {
  const dashboardUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(params.to, `[Scope Disetujui] Pengerjaan ${params.serviceType} dimulai`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Scope Disetujui, Pengerjaan Dimulai!</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, scope pekerjaan untuk <strong>${params.serviceType} - ${params.packageName}</strong> telah disetujui. Tim kami sudah mulai mengerjakan order Anda.</p>
    <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
      <p style="margin: 0; font-size: 14px; color: #1e40af;">Anda akan mendapat notifikasi saat deliverable siap untuk direview.</p>
    </div>
    <a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Lihat Progress</a>
  `));
}

export async function sendReviewReady(params: OrderEmailParams) {
  const dashboardUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(params.to, `[Review] Deliverable ${params.serviceType} siap direview`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Deliverable Siap Direview!</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, hasil pengerjaan <strong>${params.serviceType} - ${params.packageName}</strong> sudah selesai dan siap untuk Anda review.</p>
    <div style="background: #fefce8; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #eab308;">
      <p style="margin: 0; font-size: 14px; color: #854d0e;">Silakan cek deliverable, lalu pilih <strong>Setuju & Selesaikan</strong> atau <strong>Minta Revisi</strong> jika ada yang perlu diperbaiki.</p>
    </div>
    <a href="${dashboardUrl}" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">Review Sekarang</a>
  `));
}

export async function sendRevisionRequested(params: Omit<OrderEmailParams, "to"> & { feedback: string; revisionNumber: number }) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) return { success: false };
  const adminUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(to, `[Revisi #${params.revisionNumber}] ${params.clientName} - ${params.serviceType}`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Permintaan Revisi #${params.revisionNumber}</h2>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <table style="width: 100%; font-size: 14px; margin-bottom: 16px;">
        <tr><td style="color: #6b7280; padding: 4px 0;">Klien</td><td style="text-align: right; font-weight: 600;">${params.clientName}</td></tr>
        <tr><td style="color: #6b7280; padding: 4px 0;">Order</td><td style="text-align: right; font-weight: 600;">${params.serviceType} - ${params.packageName}</td></tr>
      </table>
      <div style="background: #fff; border-radius: 6px; padding: 12px; border: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px;">Feedback:</p>
        <p style="margin: 0; font-size: 14px;">${params.feedback}</p>
      </div>
    </div>
    <a href="${adminUrl}" style="display: inline-block; background: #f59e0b; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Mulai Revisi</a>
  `));
}

export async function sendRevisionStarted(params: OrderEmailParams & { revisionNumber: number }) {
  const dashboardUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(params.to, `[Revisi #${params.revisionNumber}] Pengerjaan ulang dimulai`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Revisi #${params.revisionNumber} Sedang Dikerjakan</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, tim kami sudah mulai mengerjakan revisi untuk <strong>${params.serviceType} - ${params.packageName}</strong>.</p>
    <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
      <p style="margin: 0; font-size: 14px; color: #1e40af;">Anda akan mendapat notifikasi saat hasil revisi siap direview.</p>
    </div>
    <a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 500;">Lihat Progress</a>
  `));
}

export async function sendOrderCompleted(params: OrderEmailParams) {
  const dashboardUrl = `${siteUrl()}/dashboard/orders/${params.orderId}`;
  return sendEmail(params.to, `[Selesai] Order ${params.serviceType} - ${params.packageName} selesai!`, emailWrapper(`
    <h2 style="margin: 0 0 16px; font-size: 20px;">Order Selesai!</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">Halo ${params.clientName}, order <strong>${params.serviceType} - ${params.packageName}</strong> telah selesai. Terima kasih telah mempercayakan proyek Anda kepada KelasKonten!</p>
    <div style="background: #ecfdf5; border-radius: 8px; padding: 16px; margin-bottom: 20px; border-left: 4px solid #10b981;">
      <p style="margin: 0; font-size: 14px; color: #065f46;">Semua deliverable sudah tersedia di dashboard Anda. Silakan download kapan saja.</p>
    </div>
    <a href="${dashboardUrl}" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">Lihat Deliverable</a>
  `));
}
