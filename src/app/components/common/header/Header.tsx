import Link from 'next/link';
import { createClient } from '../../../../utils/supabase/server';
import { KeyMiniIcon } from '@/components/icons/KeyMiniIcon';
import './header.css';
import { ThemeSwitcher } from './ThemeSwitcher';

export async function Header() {
  const db = createClient();
  const {
    data: { user },
  } = await db.auth.getUser();

  return (
    <header className='header fixed z-50 w-full px-6'>
      <nav className='mx-auto flex max-w-screen-xl items-center justify-between py-4'>
        <Link href={'/'}>
          <h3 className='font-bold uppercase'>indawoods</h3>
        </Link>
        <section className='flex items-center gap-4'>
          {user && (
            <Link
              href={'/dashboard'}
              className='flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-secondary'>
              <p className='text-xs font-bold uppercase'>admin</p>
              <KeyMiniIcon />
            </Link>
          )}
          <ThemeSwitcher />
        </section>
      </nav>
    </header>
  );
}
