import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { TiktokIcon } from '@/components/icons/TiktokIcon';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='w-full border-t border-border pb-32 pt-8'>
      <section className='mx-auto flex max-w-screen-xl justify-between'>
        <p>Indawoods store</p>
        <nav className='flex items-center gap-2'>
          <Link className='hoverable' href={'https://www.instagram.com/indawoodsog/'}>
            <InstagramIcon />
          </Link>
          <Link className='hoverable' href={'https://www.tiktok.com/@indawoodsog'}>
            <TiktokIcon />
          </Link>
        </nav>
      </section>
    </footer>
  );
}
