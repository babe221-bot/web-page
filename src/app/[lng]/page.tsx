"use client"
import LogoAnimation from '@/components/logo-animation';
import { useTranslation } from '@/app/i18n/client';
import { FC } from 'react';

interface PageProps {
  params: {
    lng: string;
  };
}

const Page: FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LogoAnimation />
    </main>
  );
}

export default Page;