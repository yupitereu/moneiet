import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import '@repo/ui/globals.css';

import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: '머니어트',
  description: '지출을 가볍게, 습관은 단단하게'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get('theme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''} style={{ colorScheme: theme }}>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeToggle initialTheme={theme} />
        {children}
      </body>
    </html>
  );
}
