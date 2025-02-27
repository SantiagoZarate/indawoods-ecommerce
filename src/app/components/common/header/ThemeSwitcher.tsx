'use client';

import { MoonMiniIcon } from '@/components/icons/MoonMiniIcon';
import { SunMiniIcon } from '@/components/icons/SunMiniIcon';
import useTheme from 'next-theme';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div />;
  }

  return (
    <button
      aria-label='theme switcher button'
      className='rounded-lg p-2 transition duration-150 hover:bg-border'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <MoonMiniIcon /> : <SunMiniIcon />}
    </button>
  );
}
