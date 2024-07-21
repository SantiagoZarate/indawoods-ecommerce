'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-theme';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme='system' attribute='class'>
      {children}
    </ThemeProvider>
  );
}
