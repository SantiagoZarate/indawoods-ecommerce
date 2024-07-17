import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormContext } from 'react-hook-form';
import { CreateItemSchema } from '../../../utils/zod-schema-validation/itemSchema';
import { SortableImageItem } from '../../(app)/dashboard/create/SortableItemImage';

interface Props {
  images: string[];
  onDeleteDisplayImage: (name: string) => void;
}

export function ImagesList({ images, onDeleteDisplayImage }: Props) {
  const form = useFormContext<CreateItemSchema>();

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const images = form.getValues('images');

    const activePos = images.findIndex((image) => image.name === active.id);
    const overPos = images.findIndex((image) => image.name === over.id);

    const sortedImages = arrayMove(images, activePos, overPos);

    form.setValue('images', sortedImages);
  };

  const handleDeleteImage = (imageName: string) => {
    const prevImages = form.getValues('images');
    const newImages = prevImages.filter((img) => img.name !== imageName);
    form.setValue('images', newImages);
    onDeleteDisplayImage(imageName);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <ul className='flex flex-col divide-y overflow-hidden rounded-lg border border-border'>
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={form.watch('images').map((image) => ({ id: image.name }))}>
          {images.map((image) => (
            <SortableImageItem
              onDeleteImage={handleDeleteImage}
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
