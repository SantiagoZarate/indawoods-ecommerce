import Link from 'next/link';
import Image from 'next/image';
import { ItemImageDTO } from '../../shared/dto/itemImageDTO';

interface Props {
  items: ItemImageDTO[];
}

export function ItemsGridSection({ items }: Props) {
  return (
    <ul className='grid-cols-items-responsive grid w-full pb-20'>
      {items.map((item) => (
        <li className='group relative aspect-square' key={item.id}>
          <Link href={`/item/${item.id}`}>
            <div className='group absolute inset-0 z-50 flex items-end bg-gradient-to-t from-black to-transparent p-6 opacity-0 transition duration-300 hover:opacity-100'>
              <div className='flex flex-col gap-1'>
                <p className='translate-x-0 text-xl text-border'>{item.name}</p>
                <p className='font-bold text-border'>${item.price}</p>
              </div>
            </div>
            {item.imagen.length > 1 && (
              <>
                <Image
                  className='z-10 object-cover opacity-0 transition duration-300 group-hover:opacity-100'
                  fill={true}
                  alt={`${item.name} image`}
                  src={item.imagen[1].url}
                />
              </>
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
  );
}
