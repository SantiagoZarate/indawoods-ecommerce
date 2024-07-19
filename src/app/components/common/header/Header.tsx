import Link from 'next/link';

export function Header() {
  return (
    <header className='fixed z-50 w-full border-b border-border backdrop-blur-lg'>
      <nav className='mx-auto flex max-w-screen-xl py-4'>
        <Link href={'/'}>
          <h3 className='font-bold uppercase'>indawoods</h3>
        </Link>
      </nav>
    </header>
  );
}
