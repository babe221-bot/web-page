import { dir } from 'i18next';
import { locales } from '../../i18n/settings';
import { cn } from '@/lib/utils';
import { Space_Grotesk, Inter, Source_Code_Pro } from 'next/font/google';

export function generateStaticParams() {
  return locales.map((lng: string) => ({ lng }));
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

export const metadata = {
  title: 'Rješenja za Male Biznise - DaorsForge AI',
  description: 'Nudimo izradu web stranica, audio/video produkciju, chatbotove i automatizacije za male biznise i lične potrebe.',
};

export default function SmallBusinessLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <div
      className={cn(
        'font-body antialiased',
        spaceGrotesk.variable,
        inter.variable,
        sourceCodePro.variable
      )}
    >
      {children}
    </div>
  );
}
