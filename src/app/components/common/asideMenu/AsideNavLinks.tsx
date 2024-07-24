import { MicroLeftArrow } from '@/components/icons/MicroLeftArrow';
import { ASIDE_MENU_LINKS } from '@/data/constants';
import Link from 'next/link';

export function AsideNavLinks() {
  return (
    <nav className='flex flex-col gap-2 p-2'>
      {ASIDE_MENU_LINKS.map(({ href, icon, text }) => (
        <Link
          key={text}
          className='group flex w-full justify-center gap-2 rounded-lg p-2 transition-colors duration-300 hover:bg-secondary md:justify-start'
          href={href}>
          {icon}
          <span className='hidden text-sm capitalize md:block'>{text}</span>
          <span className='hidden -translate-x-4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 md:block'>
            <MicroLeftArrow />
          </span>
        </Link>
      ))}
    </nav>
  );
}
