'use server';

import { Badge } from '@/components/ui/badge';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { BuyItemButton } from './BuyItemButton';
import { ImageGallery } from './ImageGallery';
import { ItemDetails } from './ItemDetails';
import { RecommendedItemsSection } from './RecommendedItemsSection';
import { createClient } from '../../../../utils/supabase/client';

interface Params {
  params: {
    id: number;
  };
}

export async function generateStaticParams() {
  const db = createClient();
  const { data } = await db.from('item').select('*');

  return data!.map((i) => ({ id: String(i.id) }));
}

export default async function ItemPage({ params: { id } }: Params) {
  const itemService = ServiceLocator.getService('itemService');
  const item = await itemService.getOneVisible(id);

  if (!item) {
    return <p>there is no item</p>;
  }

  const recommendedItems = await itemService.getRecommended(id);

  return (
    <>
      <section className='relative mx-auto my-32 grid min-h-screen w-full max-w-screen-xl grid-cols-5 gap-4 px-6'>
        <ImageGallery images={item.imagen} galleryID={'my-test-gallery'} />
        <aside className='col-span-2 p-4'>
          <section className='sticky top-[40%] flex flex-col gap-4 rounded-md'>
            <header className='flex items-center justify-between gap-2 border-b border-border'>
              <h2 className='text-xl font-bold capitalize'>{item.name}</h2>
              <p>${item.price}</p>
            </header>
            <Badge className='w-fit'>{item.category}</Badge>
            <ItemDetails />
            <BuyItemButton id={item.id} name={item.name} price={item.price} />
          </section>
        </aside>
      </section>
      <RecommendedItemsSection items={recommendedItems} />
    </>
  );
}
