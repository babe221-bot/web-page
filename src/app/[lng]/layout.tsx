import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import BackgroundEffects from '@/components/background-effects';
import LogoAnimation from '@/components/logo-animation';
import { cn } from '@/lib/utils';
import { Space_Grotesk, Inter, Source_Code_Pro } from 'next/font/google';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';
import { dir } from 'i18next'
import { locales } from '../i18n/settings'
import { Providers } from '@/components/providers';
import JazzRadioPlayer from '@/components/jazz-radio-player';
import React from 'react';

export async function generateStaticParams() {
  return locales.map((lng: string) => ({ lng }))
}

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: "DaorsForge AI - Inovativna AI Rješenja za Industriju",
  description: "Pružamo napredna AI rješenja za optimizaciju proizvodnje, automatizaciju procesa i kontrolu kvaliteta u klesarskoj, muzičkoj i klasičnoj industriji.",
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const { lng } = params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={cn(
          'font-body antialiased',
          spaceGrotesk.variable,
          inter.variable,
          sourceCodePro.variable
        )}
      >
        <Providers>
          <JazzRadioPlayer />
          <BackgroundEffects />
          <LogoAnimation />
          <div className="relative z-10">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
