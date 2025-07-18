'use client';

import { CookiesProvider } from 'react-cookie';
import { ChatbotProvider } from '@/context/ChatbotContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <ChatbotProvider>{children}</ChatbotProvider>
    </CookiesProvider>
  );
}
