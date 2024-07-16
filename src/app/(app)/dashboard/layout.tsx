import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <section className='flex min-h-screen'>
      <aside className='w-[300px] border-r border-border'>
        this is a sidebar
      </aside>
      <main className='flex-1 bg-neutral-300 p-6'>{children}</main>
    </section>
  );
}
