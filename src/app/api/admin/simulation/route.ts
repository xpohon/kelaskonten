import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { generateDeliverables } from "@/lib/ai-worker";
import crypto from "crypto";

export const maxDuration = 300; // 5 min timeout for AI generation

// ====== 9 SKENARIO KLIEN RIIL ======

const SCENARIOS = [
  // === SEO ===
  {
    serviceType: "SEO",
    packageName: "Basic",
    clientName: "Toko Fashion StyleKu",
    brief: "Website baru styleku.id, belum ada traffic organik sama sekali. Butuh audit SEO dasar dan optimasi untuk 5 keyword utama fashion wanita Indonesia. Target: masuk halaman 1 Google dalam 3 bulan.",
    targetAudience: "Wanita 20-35 tahun, urban, interest fashion & lifestyle",
    references: "https://berrybenka.com, https://hijup.com",
    scopeItems: [
      "Audit teknikal website (speed, mobile-friendly, indexing)",
      "Riset 5 keyword utama fashion wanita",
      "Optimasi meta title & description semua halaman utama",
      "Optimasi heading structure (H1-H3)",
      "Laporan audit SEO lengkap dalam PDF",
    ],
  },
  {
    serviceType: "SEO",
    packageName: "Pro",
    clientName: "GlowUp Clinic",
    brief: "Klinik kecantikan di Jakarta Selatan. Mau tingkatkan ranking untuk keyword skincare treatment dan facial. Kompetitor seperti ZAP dan Dermaster sudah di halaman 1. Budget marketing terbatas, fokus ke organic.",
    targetAudience: "Wanita 25-45 tahun, SES A-B, area Jabodetabek",
    references: "https://zapclinic.com, https://dermaster.co.id",
    scopeItems: [
      "Riset 15 keyword + search volume analysis",
      "Audit on-page lengkap (100+ checklist item)",
      "Audit off-page + backlink profile analysis",
      "Strategi link building: target 10 backlink berkualitas",
      "Optimasi 10 halaman prioritas (treatment pages)",
      "Laporan mingguan progress (4x laporan)",
    ],
  },
  {
    serviceType: "SEO",
    packageName: "Enterprise",
    clientName: "MebelNusantara.id",
    brief: "E-commerce furniture dengan 500+ produk. Butuh strategi SEO menyeluruh termasuk technical SEO, content strategy, dan link building. Saat ini organic traffic hanya 2000/bulan, target 20.000/bulan dalam 6 bulan.",
    targetAudience: "Pemilik rumah 28-50 tahun, SES A-B, seluruh Indonesia",
    references: "https://dekoruma.com, https://ikea.co.id, https://informa.co.id",
    scopeItems: [
      "Full technical audit (Core Web Vitals, crawlability, indexing, site architecture)",
      "Keyword research matrix: 200+ keyword mapped to product categories",
      "Content strategy + editorial calendar 6 bulan",
      "Link building plan: target 30 backlink/bulan",
      "Competitor analysis: 5 kompetitor utama",
      "Schema markup implementation plan (Product, FAQ, Breadcrumb)",
      "Monthly comprehensive report + dedicated account manager",
    ],
  },

  // === CONTENT ===
  {
    serviceType: "CONTENT",
    packageName: "Starter",
    clientName: "Kopi Kenangan Lokal",
    brief: "UMKM kedai kopi di Bandung. Baru buat website, butuh 1 artikel blog yang SEO-friendly tentang cara memilih biji kopi berkualitas. Target pembaca: pemilik coffee shop kecil yang baru mulai.",
    targetAudience: "Pemilik coffee shop kecil, barista pemula, pecinta kopi",
    references: "https://majalah.ottencoffee.co.id",
    scopeItems: [
      '1 artikel 500 kata: "Cara Memilih Biji Kopi Berkualitas untuk Coffee Shop Anda"',
      "Keyword target: cara memilih biji kopi",
      "Format SEO-friendly dengan heading structure H2-H3",
      "1x revisi setelah review",
    ],
  },
  {
    serviceType: "CONTENT",
    packageName: "Growth",
    clientName: "CreativeHub Agency",
    brief: "Digital agency yang melayani UMKM. Butuh 5 artikel untuk blog tentang digital marketing basics. Tujuannya edukasi calon klien sekaligus SEO. Target: UMKM owner yang baru mau go digital.",
    targetAudience: "Pemilik UMKM, usia 25-45, baru mulai digital marketing",
    references: "https://niagahoster.co.id/blog, https://toffeedev.com/blog",
    scopeItems: [
      "5 artikel × 800 kata, SEO-optimized",
      "Riset keyword per artikel (1 primary + 2 secondary keyword)",
      "Topik: SEO Dasar untuk UMKM, Social Media Marketing 101, Email Marketing yang Efektif, Content Marketing Strategy, Panduan Google Ads Pemula",
      "Format dengan internal linking antar artikel",
      "2x revisi per artikel",
    ],
  },
  {
    serviceType: "CONTENT",
    packageName: "Bulanan",
    clientName: "BelajarKoding.id",
    brief: "Platform edukasi online untuk developer pemula Indonesia. Butuh content plan bulanan untuk blog. Target: 20 artikel/bulan yang mendatangkan traffic dari Google. Topik seputar programming, career, dan tools.",
    targetAudience: "Developer pemula 18-30 tahun, mahasiswa IT, career switcher",
    references: "https://www.petanikode.com, https://www.codepolitan.com",
    scopeItems: [
      "Editorial calendar 1 bulan penuh (20 artikel)",
      "5 artikel sample (dari 20 yang direncanakan)",
      "Kategori: Tutorial (8), Tips & Trick (5), Career (4), Tools Review (3)",
      "Target audience: developer pemula Indonesia",
      "Unlimited revisi selama periode kontrak",
    ],
  },

  // === COPYWRITING ===
  {
    serviceType: "COPYWRITING",
    packageName: "Basic",
    clientName: "SweetBites Bakery",
    brief: "Bakery artisan di Surabaya, spesialisasi kue custom dan pastry. Baru aktif di Instagram, butuh 10 caption yang menarik untuk feed. Tone: hangat, menggiurkan, premium tapi approachable.",
    targetAudience: "Wanita 22-40 tahun, suka dessert & baking, area Surabaya",
    references: "https://instagram.com/bakeaboo.id",
    scopeItems: [
      "10 caption Instagram (mix: product highlight, behind the scene, promo, engagement)",
      "Tone: warm, appetizing, premium tapi friendly",
      "Setiap caption include CTA yang relevan",
      "Hashtag recommendations per post (10-15 hashtag)",
      "1 platform fokus: Instagram",
    ],
  },
  {
    serviceType: "COPYWRITING",
    packageName: "Pro",
    clientName: "TaskFlow App",
    brief: "Startup SaaS yang launching project management tool untuk tim remote Indonesia. Butuh copy untuk campaign launch: social media, email sequence, dan iklan digital. Target: tim startup dan SMB 5-50 orang.",
    targetAudience: "Startup founder, project manager, team lead, perusahaan 5-50 karyawan",
    references: "https://clickup.com, https://notion.so",
    scopeItems: [
      "30 caption multi-platform (10 IG, 10 TikTok, 10 LinkedIn)",
      "3 email marketing sequence (Welcome, Feature Highlight/Nurture, Free Trial → Paid/Conversion)",
      "1 Facebook/Instagram ad copy (3 variasi: awareness, consideration, conversion)",
      "Copywriting brief document dengan messaging framework",
    ],
  },
  {
    serviceType: "COPYWRITING",
    packageName: "Brand Voice",
    clientName: "ZenLife Indonesia",
    brief: "Brand wellness & self-care yang sedang rebranding. Produk: essential oil, aromatherapy, wellness journal. Butuh brand voice guide lengkap dan konten sosmed untuk 2 bulan ke depan. Visi: mindful living untuk urban millennials.",
    targetAudience: "Millennials urban 25-38, interest wellness & mindfulness, SES A-B",
    references: "https://instagram.com/breathe.id, https://forrest-essentials.com",
    scopeItems: [
      "Brand voice guideline document (personality, tone, do's & don'ts)",
      "Tone & personality matrix (formal-casual, serious-playful scale)",
      "60 caption (30/bulan × 2 bulan) untuk 3 platform",
      "Content strategy 2 bulan (content pillars, posting schedule)",
      "Sample caption per platform (IG aesthetic, TikTok casual, LinkedIn professional)",
    ],
  },
];

// ====== SIMULATION ENDPOINT ======

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = session.user as { id: string; role: string };
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    // Find demo user
    const demoUser = await prisma.user.findFirst({
      where: { email: "demo@kelaskonten.id" },
    });
    if (!demoUser) {
      return NextResponse.json({ error: "Demo user not found. Run seed first." }, { status: 400 });
    }

    // Find admin user (for messages)
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });
    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found." }, { status: 400 });
    }

    // Check body for options
    let skipAI = false;
    try {
      const body = await request.json();
      skipAI = body.skipAI === true;
    } catch {
      // no body, defaults
    }

    const results: { orderId: string; serviceType: string; packageName: string; clientName: string; status: string; deliverables: number }[] = [];

    for (const scenario of SCENARIOS) {
      // 1. Validate package exists
      const pkg = await prisma.servicePackage.findFirst({
        where: { serviceType: scenario.serviceType, name: scenario.packageName, isActive: true },
      });
      if (!pkg) {
        results.push({
          orderId: "",
          serviceType: scenario.serviceType,
          packageName: scenario.packageName,
          clientName: scenario.clientName,
          status: `SKIPPED: package ${scenario.serviceType}/${scenario.packageName} not found`,
          deliverables: 0,
        });
        continue;
      }

      // 2. Create order as demo user
      const order = await prisma.order.create({
        data: {
          userId: demoUser.id,
          serviceType: scenario.serviceType,
          packageName: scenario.packageName,
          price: pkg.price,
          brief: scenario.brief,
          targetAudience: scenario.targetAudience,
          references: scenario.references,
          status: "PENDING_PAYMENT",
        },
      });

      // 3. Create payment + simulate settlement
      const midtransOrderId = `SIM-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
      await prisma.payment.create({
        data: {
          orderId: order.id,
          midtransOrderId,
          amount: pkg.price,
          status: "PAID",
          method: "bank_transfer",
          paidAt: new Date(),
          snapToken: `sim-${midtransOrderId}`,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "SCOPE_REVIEW" },
      });

      // Message: payment received
      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: adminUser.id,
          content: `Pembayaran untuk paket ${scenario.serviceType} ${scenario.packageName} telah diterima. Terima kasih, ${scenario.clientName}! Kami akan menyiapkan scope pekerjaan.`,
        },
      });

      // 4. Admin adds scope items
      for (let i = 0; i < scenario.scopeItems.length; i++) {
        await prisma.scopeItem.create({
          data: {
            orderId: order.id,
            content: scenario.scopeItems[i],
            sortOrder: i,
          },
        });
      }

      // Message: scope ready
      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: adminUser.id,
          content: `Scope pekerjaan telah disiapkan (${scenario.scopeItems.length} item). Silakan review dan approve untuk memulai pengerjaan.`,
        },
      });

      // 5. Client approves scope
      await prisma.order.update({
        where: { id: order.id },
        data: {
          scopeApprovedAt: new Date(),
          status: "IN_PROGRESS",
        },
      });

      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: demoUser.id,
          content: `Scope pekerjaan telah disetujui oleh ${scenario.clientName}. Pengerjaan dimulai.`,
        },
      });

      // 6. AI generates deliverables (or skip)
      let deliverableCount = 0;

      if (!skipAI) {
        try {
          const aiDeliverables = await generateDeliverables({
            serviceType: scenario.serviceType,
            packageName: scenario.packageName,
            brief: scenario.brief,
            scopeItems: scenario.scopeItems,
            clientName: scenario.clientName,
          });

          for (const d of aiDeliverables) {
            await prisma.deliverable.create({
              data: {
                orderId: order.id,
                fileName: d.fileName,
                fileUrl: "#ai-generated",
                category: d.category,
                description: `${d.description} [AI-generated]`,
              },
            });
            deliverableCount++;
          }

          // Message: deliverables uploaded
          await prisma.message.create({
            data: {
              orderId: order.id,
              senderId: adminUser.id,
              content: `${deliverableCount} file deliverable telah diunggah. Silakan review hasilnya.`,
            },
          });
        } catch (aiError) {
          console.error(`AI error for ${scenario.clientName}:`, aiError);
          // Fallback: create placeholder deliverables
          const fallbackFiles = scenario.scopeItems.map((item, i) => ({
            fileName: `deliverable-${i + 1}.pdf`,
            category: scenario.serviceType === "SEO" ? "Riset & Audit" : "Draft",
            description: `${item} [Placeholder - AI unavailable]`,
          }));

          for (const d of fallbackFiles) {
            await prisma.deliverable.create({
              data: {
                orderId: order.id,
                fileName: d.fileName,
                fileUrl: "#placeholder",
                category: d.category,
                description: d.description,
              },
            });
            deliverableCount++;
          }

          await prisma.message.create({
            data: {
              orderId: order.id,
              senderId: adminUser.id,
              content: `${deliverableCount} file deliverable (placeholder) telah diunggah.`,
            },
          });
        }
      } else {
        // Skip AI: create basic placeholders
        for (let i = 0; i < scenario.scopeItems.length; i++) {
          await prisma.deliverable.create({
            data: {
              orderId: order.id,
              fileName: `deliverable-${i + 1}.pdf`,
              fileUrl: "#simulation",
              category: scenario.serviceType === "SEO" ? "Riset & Audit" : scenario.serviceType === "CONTENT" ? "Draft" : "Draft",
              description: `${scenario.scopeItems[i]} [Simulation mode]`,
            },
          });
          deliverableCount++;
        }
      }

      // 7. Status → REVIEW
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "REVIEW" },
      });

      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: adminUser.id,
          content: "Semua deliverable telah selesai. Silakan review dan berikan feedback.",
        },
      });

      // 8. Client feedback + Status → COMPLETED
      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: demoUser.id,
          content: "Terima kasih, hasilnya sangat memuaskan! Approve untuk diselesaikan.",
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "COMPLETED" },
      });

      await prisma.message.create({
        data: {
          orderId: order.id,
          senderId: adminUser.id,
          content: `Order ${scenario.serviceType} ${scenario.packageName} telah selesai. Terima kasih telah menggunakan KelasKonten! 🎉`,
        },
      });

      results.push({
        orderId: order.id,
        serviceType: scenario.serviceType,
        packageName: scenario.packageName,
        clientName: scenario.clientName,
        status: "COMPLETED",
        deliverables: deliverableCount,
      });
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      completed: results.filter((r) => r.status === "COMPLETED").length,
      orders: results,
    });
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      { error: "Simulation failed", detail: String(error) },
      { status: 500 }
    );
  }
}
