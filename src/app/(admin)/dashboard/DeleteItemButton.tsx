'use client';

import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useServerAction } from 'zsa-react';
import { ItemDTO } from '../../../shared/dto/itemDTO';
import { deleteItem } from './actions';
import { Button } from '@/components/ui/button';

interface Props extends Pick<ItemDTO, 'id' | 'name'> {}

export function DeleteItemButton({ id, name }: Props) {
  const { execute, isPending } = useServerAction(deleteItem, {
    onError: ({ err }) => {
      toast({ title: 'Ooops', description: err.message });
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'item deleted succesfully' });
    },
    onStart: () => {
      toast({ title: 'wait', description: 'deleting item...' });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={isPending}
          className='font-medium text-red-600 hover:underline disabled:text-red-200 dark:text-red-500'>
          Delete
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item?
          </DialogDescription>
        </DialogHeader>
        <p className='font-bold capitalize'>{name}</p>
        <DialogFooter className='sm:justify-end'>
          <form action={() => execute({ id })}>
            <Button
              variant={'destructive'}
              disabled={isPending}
              className='font-medium hover:underline dark:text-red-500'>
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
