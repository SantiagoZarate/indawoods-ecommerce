import Link from 'next/link';
import { createClient } from '../../../../utils/supabase/server';
import { KeyMiniIcon } from '@/components/icons/KeyMiniIcon';

export async function Header() {
  const db = createClient();
  const {
    data: { user },
  } = await db.auth.getUser();

  return (
    <header className='fixed z-50 w-full border-b border-border backdrop-blur-lg'>
      <nav className='mx-auto flex max-w-screen-xl items-center justify-between py-4'>
        <Link href={'/'}>
          <h3 className='font-bold uppercase'>indawoods</h3>
        </Link>
        {user && (
          <Link
            href={'/dashboard'}
            className='flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-secondary'>
            <p className='text-xs font-bold uppercase'>admin</p>
            <KeyMiniIcon />
          </Link>
        )}
      </nav>
    </header>
  );
}
