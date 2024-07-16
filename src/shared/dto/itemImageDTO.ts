import { z } from 'zod';
import { itemSchemaDTO } from './itemDTO';
import { imageSchemaDTO } from './imageDTO';

export const itemImageSchemaDTO = itemSchemaDTO.extend({
  images: z.array(imageSchemaDTO).optional(),
});

export type ItemImageDTO = z.infer<typeof itemImageSchemaDTO>;
