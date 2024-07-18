import { z } from 'zod';
import { itemImageSchemaDTO } from './itemImageDTO';
import { itemTalleSchemaDTO } from './itemTalleDTO';

export const itemImagenTalleSchemaDTO = itemImageSchemaDTO.extend({
  item_talle: z.array(itemTalleSchemaDTO),
});

export type ItemImagenTalleDTO = z.infer<typeof itemImagenTalleSchemaDTO>;
