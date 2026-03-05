import Anthropic from "@anthropic-ai/sdk";

interface OrderInput {
  serviceType: string;
  packageName: string;
  brief: string;
  scopeItems: string[];
  clientName: string;
}

interface DeliverableOutput {
  fileName: string;
  category: string;
  description: string;
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildSEOPrompt(order: OrderInput): string {
  return `Kamu adalah SEO specialist profesional di agensi digital marketing Indonesia "KelasKonten".

KLIEN: ${order.clientName}
PAKET: SEO ${order.packageName}
BRIEF: ${order.brief}

SCOPE PEKERJAAN:
${order.scopeItems.map((s, i) => `${i + 1}. ${s}`).join("\n")}

INSTRUKSI:
Buatkan deliverable lengkap untuk klien ini. Untuk setiap scope item, buat output yang detail dan actionable.

FORMAT OUTPUT sebagai JSON (tanpa markdown code block):
{
  "deliverables": [
    {
      "fileName": "nama-file.pdf",
      "category": "Riset & Audit",
      "description": "Deskripsi singkat deliverable ini (1 kalimat)"
    }
  ]
}

Gunakan category: "Riset & Audit" untuk audit/riset, "Implementasi" untuk optimasi/strategi, "Laporan" untuk report.
Pastikan fileName deskriptif dan menggunakan kebab-case.
Output HANYA JSON, tanpa teks tambahan.`;
}

function buildContentPrompt(order: OrderInput): string {
  return `Kamu adalah content writer profesional di agensi digital marketing Indonesia "KelasKonten".

KLIEN: ${order.clientName}
PAKET: Content ${order.packageName}
BRIEF: ${order.brief}

SCOPE PEKERJAAN:
${order.scopeItems.map((s, i) => `${i + 1}. ${s}`).join("\n")}

INSTRUKSI:
Buatkan deliverable lengkap untuk klien ini. Untuk setiap artikel/konten yang diminta di scope, buat output-nya.

FORMAT OUTPUT sebagai JSON (tanpa markdown code block):
{
  "deliverables": [
    {
      "fileName": "nama-file.docx",
      "category": "Draft",
      "description": "Deskripsi singkat deliverable ini (1 kalimat)"
    }
  ]
}

Gunakan category: "Draft" untuk draft artikel, "Revisi" untuk revisi, "Final" untuk final version.
Pastikan fileName deskriptif dan menggunakan kebab-case.
Output HANYA JSON, tanpa teks tambahan.`;
}

function buildCopywritingPrompt(order: OrderInput): string {
  return `Kamu adalah copywriter kreatif di agensi digital marketing Indonesia "KelasKonten".

KLIEN: ${order.clientName}
PAKET: Copywriting ${order.packageName}
BRIEF: ${order.brief}

SCOPE PEKERJAAN:
${order.scopeItems.map((s, i) => `${i + 1}. ${s}`).join("\n")}

INSTRUKSI:
Buatkan deliverable lengkap untuk klien ini. Untuk setiap item yang diminta di scope, buat output-nya.

FORMAT OUTPUT sebagai JSON (tanpa markdown code block):
{
  "deliverables": [
    {
      "fileName": "nama-file.docx",
      "category": "Draft",
      "description": "Deskripsi singkat deliverable ini (1 kalimat)"
    }
  ]
}

Gunakan category: "Draft" untuk draft pertama, "Revisi" untuk revisi, "Final" untuk final version.
Pastikan fileName deskriptif dan menggunakan kebab-case.
Output HANYA JSON, tanpa teks tambahan.`;
}

export async function generateDeliverables(
  order: OrderInput
): Promise<DeliverableOutput[]> {
  let prompt: string;

  switch (order.serviceType) {
    case "SEO":
      prompt = buildSEOPrompt(order);
      break;
    case "CONTENT":
      prompt = buildContentPrompt(order);
      break;
    case "COPYWRITING":
      prompt = buildCopywritingPrompt(order);
      break;
    default:
      prompt = buildContentPrompt(order);
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = response.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text in AI response");
  }

  const jsonStr = textContent.text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const parsed = JSON.parse(jsonStr);
  return parsed.deliverables as DeliverableOutput[];
}
