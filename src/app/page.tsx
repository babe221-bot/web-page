import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import dynamic from 'next/dynamic'

const Services = dynamic(() => import('@/components/sections/services'))
const Industries = dynamic(() => import('@/components/sections/industries'))
const Methodology = dynamic(() => import('@/components/sections/methodology'))
const LogoShowcase = dynamic(() => import('@/components/sections/logo-showcase'))
const ContactSection = dynamic(() => import('@/components/sections/contact-section'))

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Services />
      <Industries />
      <Methodology />
      <LogoShowcase />
      <ContactSection />
      <Footer />
    </main>
  );
}
