import { z } from 'zod';
import { itemSchemaDTO } from './itemDTO';
import { imageSchemaDTO } from './imageDTO';

export const itemImageSchemaDTO = itemSchemaDTO.extend({
  imagen: z.array(imageSchemaDTO),
});

export type ItemImageDTO = z.infer<typeof itemImageSchemaDTO>;
