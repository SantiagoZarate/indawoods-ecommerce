import Link from 'next/link';
import Image from 'next/image';

import { ServiceLocator } from '../../service/serviceLocator';

export default async function Page() {
  const itemService = ServiceLocator.getService('itemService');
  const items = await itemService.getAllForHomepage();

  return (
    <>
      <section className='w-full border-b border-border py-20'>
        <h1 className='text-center text-[250px] text-neutral-50'>INDAWOODS</h1>
      </section>
      <ul className='grid w-full grid-cols-4 pb-20'>
        {items.map((item) => (
          <li className='group relative aspect-square' key={item.id}>
            <Link href={''}>
              <Image
                className='z-10 object-cover transition duration-300 group-hover:opacity-0'
                fill={true}
                alt={`${item.name} image`}
                src={item.imagen[2].url}
              />
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
