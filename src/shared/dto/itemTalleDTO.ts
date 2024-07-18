import { z } from 'zod';

export const itemTalleSchemaDTO = z.object({
  item_id: z.string(),
  talle_medida: z.string(),
  isAvailable: z.boolean(),
});

export type ItemTalleDTO = z.infer<typeof itemTalleSchemaDTO>;
