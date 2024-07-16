'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { categories } from '../../../../constants';
import {
  createItemSchema,
  defaultCreateItemValues,
  type CreateItemSchema,
} from '../../../../utils/zod-schema-validation/itemSchema';
import { SortableImageItem } from './SortableItemImage';

export function CreateItemForm() {
  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
    defaultValues: defaultCreateItemValues,
  });

  const onSubmit = (data: CreateItemSchema) => {
    console.log(data);
    form.reset();
  };

  const handleDeleteImage = (imageName: string) => {
    const prevImages = form.getValues('images');
    const newImages = prevImages.filter((img) => img.name !== imageName);
    form.setValue('images', newImages);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) return;

    const images = form.getValues('images');

    const activePos = images.findIndex((image) => image.name === active.id);
    const overPos = images.findIndex((image) => image.name === over.id);

    const sortedImages = arrayMove(images, activePos, overPos);

    form.setValue('images', sortedImages);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='new t-shirt' {...field} />
              </FormControl>
              <FormDescription>your new item name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='new t-shirt' {...field} />
              </FormControl>
              <FormDescription>item description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Your item category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-2'>
          <label htmlFor='images' className=''>
            Images
            <div className='flex w-full cursor-pointer items-center justify-center rounded-lg border border-border p-2 transition hover:-translate-y-1'>
              add image
            </div>
            <input
              onChange={(e) => {
                console.log(e.target.files);
                const oldImages = form.getValues('images');
                form.setValue('images', [...oldImages, e.target.files![0]]);
              }}
              id='images'
              name='images'
              hidden
              type='file'
            />
          </label>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}>
            <ul className='flex flex-col divide-y overflow-hidden rounded-lg border border-border'>
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={form
                  .watch('images')
                  .map((image) => ({ id: image.name }))}>
                {form.watch('images').map((image) => (
                  <SortableImageItem
                    onDeleteImage={handleDeleteImage}
                    image={image}
                    key={image.name}
                    id={image.name}
                  />
                ))}
              </SortableContext>
            </ul>
          </DndContext>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
