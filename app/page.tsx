import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductMenu } from "@/components/ProductMenu";
import { BrandStory } from "@/components/BrandStory";
import { CustomOrders } from "@/components/CustomOrders";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductMenu />
        <BrandStory />
        <CustomOrders />
        <InstagramFeed />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
