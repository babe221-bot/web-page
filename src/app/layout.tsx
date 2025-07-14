import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BackgroundEffects from '@/components/background-effects';
import LogoAnimation from '@/components/logo-animation';
import { cn } from '@/lib/utils';
import { Orbitron, Montserrat, Chivo_Mono } from 'next/font/google';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-headline',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
});

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: "DaorsForge AI - Inovativna AI Rješenja za Industriju",
  description: "Pružamo napredna AI rješenja za optimizaciju proizvodnje, automatizaciju procesa i kontrolu kvaliteta u klesarskoj, muzičkoj i klasičnoj industriji.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
          orbitron.variable,
          montserrat.variable,
          chivoMono.variable
        )}
      >
        <BackgroundEffects />
        <LogoAnimation />
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
