import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BackgroundEffects from '@/components/background-effects';
import { cn } from '@/lib/utils';
import { Space_Grotesk, Inter, Source_Code_Pro } from 'next/font/google';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';
import { Providers } from '@/components/providers';
import React from 'react';
import { RadioProvider } from '@/context/RadioContext';
import JazzRadioPlayer from '@/components/jazz-radio-player';

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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
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
          <RadioProvider>
            <JazzRadioPlayer />
            <BackgroundEffects />
            <div className="relative z-10">{children}</div>
            <Toaster />
          </RadioProvider>
        </Providers>
      </body>
    </html>
  );
}
