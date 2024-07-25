'use client';

import { Sortable } from '@/components/dnd/Sortable';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useRef, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { ItemDTO } from '../../../shared/dto/itemDTO';
import { updateItemsPositionType } from '../../../utils/zod-schema-validation/updateItemsPositionSchema';
import { updateItemsPosition } from './actions';

interface Props {
  items: (updateItemsPositionType & Pick<ItemDTO, 'name'>)[];
}

export function SortableItemsList({ items }: Props) {
  const backupOrder = useRef(items);
  const [itemsPosition, setItemsPosition] = useState(items);

  const { execute, isPending } = useServerAction(updateItemsPosition, {
    onError: ({ err }) => {
      toast({ title: 'Error', description: err.message });
    },
    onSuccess: () => {
      toast({ title: 'Success!', description: 'items positions updated succesfully' });
    },
  });

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const activePos = itemsPosition.findIndex((item) => item.id === active.id);
    const overPos = itemsPosition.findIndex((item) => item.id === over.id);

    const newArr = arrayMove(itemsPosition, activePos, overPos);

    const updatedArr = newArr.map((item, index, arr) => ({
      ...item,
      sort_position: arr.length - index,
    }));

    setItemsPosition(updatedArr);
  };

  const filteredUnmodifiedItems = itemsPosition.filter((item) => {
    const index = itemsPosition.indexOf(item);
    return backupOrder.current[index].id !== item.id;
  });

  return (
    <section className='flex flex-col gap-6'>
      <header className='flex items-center justify-between gap-6'>
        <h1>Sort items</h1>
        <Button onClick={() => setItemsPosition(backupOrder.current)} className=''>
          reset positions
        </Button>
      </header>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <ul className='flex flex-col divide-y overflow-hidden rounded-lg border border-border'>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={itemsPosition.map((item) => ({ id: item.id }))}>
            {itemsPosition.map(({ id, name }) => (
              <Sortable id={id} key={id}>
                <article className='flex items-center justify-between px-4'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-bold'>{name}</p>
                    <p className='text-xs'>ID: {id}</p>
                  </div>
                </article>
              </Sortable>
            ))}
          </SortableContext>
        </ul>
      </DndContext>
      <footer className='flex justify-end'>
        <Button
          onClick={() => {
            execute(filteredUnmodifiedItems);
          }}
          disabled={isPending || filteredUnmodifiedItems.length === 0}>
          Save
        </Button>
      </footer>
    </section>
  );
}
