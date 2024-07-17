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
  onSortImages: (images: string[]) => void;
}

export function ImagesList({
  images,
  onDeleteDisplayImage,
  onSortImages,
}: Props) {
  const form = useFormContext<CreateItemSchema>();

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const activePos = images.findIndex((image) => image === active.id);
    const overPos = images.findIndex((image) => image === over.id);

    const sortedImages = arrayMove(images, activePos, overPos);

    onSortImages(sortedImages);
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
          items={images.map((image) => ({ id: image }))}>
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
