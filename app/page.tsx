import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductsSection } from "@/components/products-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-small opacity-100 dark:opacity-40 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <Footer />
    </div>
  );
}
