import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { Sortable } from '../dnd/Sortable';
import { ItemImage } from './ItemImage';
import { imageHasBeenAlreadyUploaded } from '@/(admin)/edit/[id]/EditItem';

export function ImagesList() {
  const form = useFormContext<CreateItemSchema>();

  const displayImages = form
    .watch('images')
    .map((imageFile) =>
      !imageHasBeenAlreadyUploaded(imageFile.name)
        ? URL.createObjectURL(imageFile)
        : imageFile.name,
    );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const activePos = displayImages.findIndex((image) => image === active.id);
    const overPos = displayImages.findIndex((image) => image === over.id);

    const images = form.getValues('images');

    const newArr = arrayMove(images, activePos, overPos);

    form.setValue('images', newArr);
  };

  const handleDeleteImage = (index: number) => {
    const prevImages = form.getValues('images');
    const firstHalf = prevImages.slice(0, index);
    const secondHalf = prevImages.slice(index + 1);

    form.setValue('images', firstHalf.concat(secondHalf));
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <ul className='flex flex-col divide-y overflow-hidden rounded-lg border border-border'>
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={displayImages.map((image) => ({ id: image }))}>
          {displayImages.map((image, index) => (
            <Sortable id={image} key={image}>
              <ItemImage
                imageSRC={image}
                onDeleteImage={() => handleDeleteImage(index)}
              />
            </Sortable>
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
}
