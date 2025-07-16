import Image from 'next/image';
import { logoShowcaseData } from '@/lib/data';

const LogoShowcase = () => {
    return (
        <section className="py-20" aria-labelledby="logo-showcase-heading">
            <div className="container mx-auto px-4">
                <h2 id="logo-showcase-heading" className="text-3xl font-bold text-center mb-12">Poverenje Kroz Inovacije: Naši Partneri</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {logoShowcaseData.map((logo, index) => (
                        <div key={index} className="relative h-16 w-32">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                objectFit="contain"
                                className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoShowcase;
