'use server';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { BuyItemButton } from './BuyItemButton';
import { ImageGallery } from './ImageGallery';
import { RecommendedItemsSection } from './RecommendedItemsSection';

interface Params {
  params: {
    id: number;
  };
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
      <section className='relative mx-auto my-32 grid min-h-screen w-full max-w-screen-xl grid-cols-5'>
        <ImageGallery images={item.imagen} galleryID={'my-test-gallery'} />
        <aside className='col-span-2 p-4'>
          <section className='sticky top-[40%] flex flex-col gap-4 rounded-md p-4'>
            <header className='flex items-center justify-between gap-2 border-b border-border'>
              <h2 className='text-xl font-bold capitalize'>{item.name}</h2>
              <p>${item.price}</p>
            </header>
            <Badge className='w-fit'>{item.category}</Badge>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <BuyItemButton id={item.id} name={item.name} price={item.price} />
          </section>
        </aside>
      </section>
      <RecommendedItemsSection items={recommendedItems} />
    </>
  );
}
