import Footer from "@/components/sections/footer";
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/sections/header'), { ssr: false })
const Hero = dynamic(() => import('@/components/sections/hero'), { ssr: false })
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
