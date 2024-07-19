import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { SortableImageItem } from '@/(admin)/create/SortableItemImage';

export function ImagesList() {
  const form = useFormContext<CreateItemSchema>();

  const displayImages = form
    .watch('images')
    .map((imageFile) => URL.createObjectURL(imageFile));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const activePos = displayImages.findIndex((image) => image === active.id);
    const overPos = displayImages.findIndex((image) => image === over.id);

    const images = form.getValues('images');

    const activeImage = images[activePos];
    const overImage = images[overPos];

    images[activePos] = overImage;
    images[overPos] = activeImage;

    form.setValue('images', images);
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
            <SortableImageItem
              onDeleteImage={() => handleDeleteImage(index)}
              displayImage={image}
              key={image}
              id={image}
            />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
}
