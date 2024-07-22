import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ServiceLocator } from '../../../../service/serviceLocator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
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
        <ul className='col-span-3 flex flex-col gap-8'>
          {item.imagen.map((image) => (
            <li key={image.id} className='relative h-full min-h-[600px] w-full'>
              <Image
                className='object-cover'
                fill={true}
                alt={`${item.name} image`}
                src={image.url}
              />
            </li>
          ))}
        </ul>
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
            <Button className='uppercase'>comprar</Button>
          </section>
        </aside>
      </section>
      <RecommendedItemsSection items={recommendedItems} />
    </>
  );
}
