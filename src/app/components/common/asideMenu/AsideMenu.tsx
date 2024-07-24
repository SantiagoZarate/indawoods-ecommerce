import { AsideHeader } from './AsideHeader';
import { AsideNavLinks } from './AsideNavLinks';
import { LogoutButton } from './LogoutButton';

export function AsideMenu() {
  return (
    <aside className='fixed left-0 hidden h-screen max-h-screen w-full max-w-[300px] flex-col border-r border-border bg-background md:left-0 md:flex'>
      <AsideHeader />
      <section className='flex h-full flex-col justify-between'>
        <AsideNavLinks />
        <LogoutButton />
      </section>
    </aside>
  );
}
