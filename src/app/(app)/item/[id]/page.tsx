import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ServiceLocator } from '../../../../service/serviceLocator';

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
            <p className='text-sm'>{item.description}</p>
            <Badge className='w-fit'>{item.category}</Badge>
            <Button className='uppercase'>comprar</Button>
          </section>
        </aside>
      </section>
      <section className='grid w-full grid-cols-4 divide-x divide-border border-t border-border'>
        <div className='h-80'></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </>
  );
}
