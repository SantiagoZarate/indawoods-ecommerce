export default function ItemLoader() {
  return (
    <section className='relative mx-auto my-32 grid min-h-screen w-full max-w-screen-xl animate-pulse grid-cols-5 gap-4 px-6'>
      <section className='col-span-3 flex flex-col gap-8'>
        {[1, 2, 3].map((n) => (
          <div key={n} className='min-h-[70vh] w-full rounded-lg bg-secondary' />
        ))}
      </section>
      <aside className='col-span-2'>
        <section className='sticky top-[40%] flex flex-col gap-4 rounded-md p-4'>
          <header className='flex items-center justify-between gap-2 border-b border-border pb-4'>
            <p className='h-6 w-2/3 rounded-md bg-secondary' />
            <p className='h-6 w-1/3 rounded-md bg-secondary' />
          </header>
          <p className='h-6 w-full rounded-md bg-secondary' />
          <div className='h-4 w-full rounded-md bg-secondary' />
          <div className='h-4 w-full rounded-md bg-secondary' />
        </section>
      </aside>
    </section>
  );
}
