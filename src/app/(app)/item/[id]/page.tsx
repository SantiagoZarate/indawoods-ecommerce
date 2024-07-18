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
  const item = await itemService.getOne(id);

  console.log(item);

  if (!item) {
    return <p>there is no item</p>;
  }

  return (
    <section className='relative mx-auto grid w-full max-w-screen-xl grid-cols-5'>
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
        <section className='sticky top-0 flex flex-col gap-2 rounded-md border border-border p-4'>
          <header className='flex flex-col gap-1 border-b border-border'>
            <h2 className='text-xl font-bold capitalize'>{item.name}</h2>
            <p>$9500</p>
          </header>
          <p className='text-sm'>{item.description}</p>
          <Badge className='w-fit'>{item.category}</Badge>
          <Button>comprar</Button>
        </section>
      </aside>
    </section>
  );
}
