'use client';

import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import React from 'react';
import { useTranslation } from '@/app/i18n/client';

export default function SmallBusinessSolutionsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const { lng } = params;

  return (
    <>
      <Header lng={lng} />
      <main className="flex-grow">{children}</main>
      <Footer lng={lng} />
    </>
  );
}
