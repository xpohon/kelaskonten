import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const packages = [
  // SEO
  {
    serviceType: "SEO",
    name: "Basic",
    price: 500000,
    description: "5 keyword, audit on-page, laporan bulanan",
    sortOrder: 0,
  },
  {
    serviceType: "SEO",
    name: "Pro",
    price: 1500000,
    description: "15 keyword, on+off page, backlink, laporan mingguan",
    sortOrder: 1,
  },
  {
    serviceType: "SEO",
    name: "Enterprise",
    price: 3500000,
    description: "Unlimited keyword, full strategy, dedicated manager",
    sortOrder: 2,
  },
  // CONTENT
  {
    serviceType: "CONTENT",
    name: "Starter",
    price: 150000,
    description: "1 artikel 500 kata, SEO-friendly, 1 revisi",
    sortOrder: 0,
  },
  {
    serviceType: "CONTENT",
    name: "Growth",
    price: 500000,
    description: "5 artikel 800 kata, riset keyword, 2 revisi",
    sortOrder: 1,
  },
  {
    serviceType: "CONTENT",
    name: "Bulanan",
    price: 1500000,
    description: "20 artikel/bulan, editorial calendar, unlimited revisi",
    sortOrder: 2,
  },
  // COPYWRITING
  {
    serviceType: "COPYWRITING",
    name: "Basic",
    price: 200000,
    description: "10 caption sosmed, 1 platform",
    sortOrder: 0,
  },
  {
    serviceType: "COPYWRITING",
    name: "Pro",
    price: 750000,
    description: "30 caption + 3 email marketing + 1 iklan",
    sortOrder: 1,
  },
  {
    serviceType: "COPYWRITING",
    name: "Brand Voice",
    price: 2000000,
    description: "Brand guideline + 60 caption + strategi konten",
    sortOrder: 2,
  },
];

async function main() {
  console.log("Seeding service packages...");

  for (const pkg of packages) {
    await prisma.servicePackage.upsert({
      where: {
        serviceType_name: {
          serviceType: pkg.serviceType,
          name: pkg.name,
        },
      },
      update: {
        price: pkg.price,
        description: pkg.description,
        sortOrder: pkg.sortOrder,
      },
      create: pkg,
    });
    console.log(`  ✓ ${pkg.serviceType} - ${pkg.name}: Rp ${pkg.price.toLocaleString("id-ID")}`);
  }

  console.log("\nDone! 9 packages seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
