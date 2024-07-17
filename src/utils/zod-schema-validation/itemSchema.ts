import { z } from 'zod';
import { categories } from '../../constants';

const imageSchema = z
  .array(z.instanceof(File))
  .max(5, { message: "Item can't have more than 5 images" })
  .refine((files) =>
    files.every(
      (file) =>
        file.size <= 5 * 1024 * 1024 &&
        ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    ),
  );

export const createItemSchema = z.object({
  category: z.enum(categories),
  name: z
    .string()
    .min(4, { message: 'Item name should be larger than 4 characters' }),
  description: z
    .string()
    .min(4, { message: 'Item description should be larger than 4 characters' }),
  talles: z
    .string()
    .array()
    .min(1, { message: 'Item must be available in at least one size' }),
});

export const createItemSchemaClient = createItemSchema.extend({
  guia_de_talles: z.instanceof(File).optional(),
  images: imageSchema,
});

export type CreateItemSchema = z.infer<typeof createItemSchemaClient>;

export const createItemSchemaServer = createItemSchema.extend({
  imagesURL: z.array(
    z.object({
      publicUrl: z.string().url(),
      sort_order: z.coerce.number().min(1),
    }),
  ),
  guiaDeTallesPublicURL: z.string().url().optional(),
});

export const defaultCreateItemValues = {
  category: undefined,
  talle: undefined,
  description: '',
  images: [],
  name: '',
  guia_de_talles: undefined,
};
