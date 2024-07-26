import { AsideHeader } from './AsideHeader';
import { AsideNavLinks } from './AsideNavLinks';
import { BotomSection } from './BotomSection';

export function AsideMenu() {
  return (
    <aside className='fixed left-0 flex h-screen max-h-screen w-fit max-w-[300px] flex-col border-r border-border bg-background md:w-full'>
      <AsideHeader />
      <section className='flex h-full flex-col justify-between'>
        <AsideNavLinks />
        <BotomSection />
      </section>
    </aside>
  );
}
