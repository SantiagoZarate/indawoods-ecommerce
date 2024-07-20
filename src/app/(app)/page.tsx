import Link from 'next/link';
import Image from 'next/image';

import { ServiceLocator } from '../../service/serviceLocator';

export default async function Page() {
  const itemService = ServiceLocator.getService('itemService');
  const items = await itemService.getAllVisible();

  return (
    <>
      <section className='w-full border-b border-border py-20'>
        <h1 className='text-center text-[250px] text-primary'>INDAWOODS</h1>
      </section>
      <ul className='grid w-full grid-cols-4 pb-20'>
        {items.map((item) => (
          <li className='group relative aspect-square' key={item.id}>
            <Link href={`/item/${item.id}`}>
              {item.imagen.length > 1 && (
                <Image
                  className='z-10 object-cover opacity-0 transition duration-300 group-hover:opacity-100'
                  fill={true}
                  alt={`${item.name} image`}
                  src={item.imagen[1].url}
                />
              )}
              <Image
                className='absolute inset-0 z-0 object-cover'
                fill={true}
                alt={`${item.name} image`}
                src={item.imagen[0].url}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
