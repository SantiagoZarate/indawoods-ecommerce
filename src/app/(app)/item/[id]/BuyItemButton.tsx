'use client';

import { Button } from '@/components/ui/button';
import { buyItem } from './actions';
import { useServerAction } from 'zsa-react';
import { ItemPayment } from '../../../../shared/dto/itemDTO';

interface Props extends ItemPayment {}

export function BuyItemButton({ id, name, price }: Props) {
  const { execute, isPending } = useServerAction(buyItem, {
    onError: () => {
      console.log('There was an error');
    },
  });

  return (
    <Button
      onClick={() =>
        execute({
          id,
          name,
          price: String(price),
        })
      }
      disabled={isPending}
      className='uppercase'>
      comprar
    </Button>
  );
}
