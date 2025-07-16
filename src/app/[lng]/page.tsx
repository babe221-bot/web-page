import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import dynamic from 'next/dynamic'

const Services = dynamic(() => import('@/components/sections/services'))
const Industries = dynamic(() => import('@/components/sections/industries'))
const Methodology = dynamic(() => import('@/components/sections/methodology'))
const ContactSection = dynamic(() => import('@/components/sections/contact-section'))

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header lng={lng} />
      <Hero lng={lng} />
      <Services />
      <Industries />
      <Methodology />
      <ContactSection />
      <Footer />
    </main>
  );
}
