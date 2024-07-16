import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <section className='flex min-h-screen'>
      <aside className='w-[300px] border-r border-border'>
        <h2 className='flex flex-col gap-1 border-b p-4'>
          <span className='text-2xl'>indawoods</span>
          <span className='font-mono text-xs uppercase'>dashboard</span>
        </h2>
        this is a sidebar
      </aside>
      <main className='flex-1 bg-neutral-50 p-6'>{children}</main>
    </section>
  );
}
