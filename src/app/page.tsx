"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/app/i18n/settings';
import LogoAnimation from '@/components/logo-animation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push(`/${defaultLocale}`);
    }, 3500); // Same delay as the logo animation

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LogoAnimation />
    </main>
  );
}
