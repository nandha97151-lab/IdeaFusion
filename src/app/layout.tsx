import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ParticleBackground from '@/components/ParticleBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'IdeaFusion – AI-Powered Innovation Engine',
  description: 'Combine the Unexpected. Create the Impossible. IdeaFusion uses AI to combine unrelated concepts and transform them into practical, innovative invention ideas.',
  keywords: 'AI, innovation, invention, ideas, creativity, generator, combinations, future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased selection:bg-primary-500/30 selection:text-white`}>
        <ParticleBackground />
        <div className="relative z-10 flex h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
