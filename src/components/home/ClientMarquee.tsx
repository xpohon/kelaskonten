"use client";

const clients = [
  "TokoBaju.id",
  "KedaiKopi Nusantara",
  "RumahSkincare",
  "AutoParts ID",
  "DesainRumah Pro",
  "FitnesFirst Jakarta",
  "PetShop Bandung",
  "Apotek Digital",
  "TravelNesia",
  "EdukasiOnline",
  "FoodDelivery ID",
  "PropertyHub",
];

export default function ClientMarquee() {
  return (
    <section className="py-8 border-y border-card-border overflow-hidden bg-surface/50">
      <div className="flex items-center">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-lg font-heading font-semibold text-muted/40 hover:text-muted transition-colors"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
