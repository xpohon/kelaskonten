import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ClientMarquee from "@/components/home/ClientMarquee";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialSection from "@/components/home/TestimonialSection";
import BlogPreview from "@/components/home/BlogPreview";
import InstagramPreview from "@/components/home/InstagramPreview";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ClientMarquee />
        <StatsSection />
        <ServicesSection />
        <HowItWorks />
        <TestimonialSection />
        <BlogPreview />
        <InstagramPreview />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "KelasKonten",
            url: "https://kelaskonten.id",
            logo: "https://kelaskonten.id/logo.png",
            description:
              "Jasa SEO, penulisan konten, dan copywriting profesional Indonesia. 300+ klien puas dengan hasil nyata.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+62-812-3456-7890",
              contactType: "customer service",
              areaServed: "ID",
              availableLanguage: "Indonesian",
            },
            sameAs: [
              "https://instagram.com/kelaskontenid",
              "https://linkedin.com/company/kelaskonten",
              "https://twitter.com/kelaskontenid",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />
    </>
  );
}
