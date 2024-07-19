import { MicroLeftArrow } from '@/components/icons/MicroLeftArrow';
import { ASIDE_MENU_LINKS } from '@/data/constants';
import Link from 'next/link';
import Image from 'next/image';

export function AsideMenu() {
  return (
    <aside className='w-[300px] border-r border-border'>
      <header className='flex items-center gap-2 border-b p-4'>
        <div className='relative aspect-square size-12 overflow-hidden rounded-lg'>
          <Image fill={true} alt='indawoods logo' src={'/images/indawoods-logo.jpg'} />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-2xl'>indawoods</span>
          <span className='font-mono text-xs uppercase'>dashboard</span>
        </div>
      </header>
      <nav className='flex flex-col gap-2 p-2'>
        {ASIDE_MENU_LINKS.map(({ href, icon, text }) => (
          <Link
            key={text}
            className='group flex items-center gap-2 rounded-lg p-2 transition-colors duration-300 hover:bg-secondary'
            href={href}>
            {icon}
            <span className='text-sm capitalize'>{text}</span>
            <span className='-translate-x-4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100'>
              <MicroLeftArrow />
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
