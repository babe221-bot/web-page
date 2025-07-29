'use client';

import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/chatbot'), { ssr: false });

export default function ChatbotLoader() {
  return <Chatbot />;
}
