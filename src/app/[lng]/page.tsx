import Chatbot from "@/components/chatbot";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Industries from "@/components/sections/industries";
import Methodology from "@/components/sections/methodology";
import ContactSection from "@/components/sections/contact-section";

export default async function Home({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  return (
    <main className="flex min-h-screen flex-col">
      <Header lng={lng} />
      <Hero lng={lng} />
      <Services />
      <Industries />
      <Methodology />
      <ContactSection />
      <Footer lng={lng} />
      <Chatbot />
    </main>
  );
}
