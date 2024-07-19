import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Footer } from '@/components/common/footer/Footer';
import { Header } from '@/components/common/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'indawoods store',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-primary`}>
        <Header />
        <section className='mt-20 w-full'>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
