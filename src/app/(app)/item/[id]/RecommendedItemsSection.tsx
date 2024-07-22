import Image from 'next/image';
import { ItemRecommendedDTO } from '../../../../shared/dto/itemDTO';
import Link from 'next/link';

interface Props {
  items: ItemRecommendedDTO[];
}

export function RecommendedItemsSection({ items }: Props) {
  return (
    <section className='grid w-full grid-cols-4 divide-x divide-border border-t border-border'>
      {items.map((item) => (
        <Link href={`/item/${item.id}`} key={item.id} className='relative aspect-square'>
          <Image
            alt='item image'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw'
            className='object-cover'
            fill
            src={item.image}
          />
        </Link>
      ))}
    </section>
  );
}
