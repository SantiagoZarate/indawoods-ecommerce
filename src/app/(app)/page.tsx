import { Suspense } from 'react';
import { ItemsGridSection, ItemsGridSkeleton } from './ItemsGridSection';

export default function Page() {
  return (
    <>
      <section className='relative w-full border-b border-border px-6 py-20'>
        <h1 className='relative text-center text-[15vw] text-primary'>INDAWOODS</h1>
      </section>
      <div className='border-b border-border'>
        <p className='p-1 text-sm'>
          indawoods - indawoods - indawoods - indawoods - indawoods - indawoods -{' '}
        </p>
      </div>
      <Suspense fallback={<ItemsGridSkeleton />}>
        <ItemsGridSection />
      </Suspense>
    </>
  );
}
