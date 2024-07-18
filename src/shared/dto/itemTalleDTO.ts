import { z } from 'zod';

export const itemTalleSchemaDTO = z.object({
  item_id: z.number(),
  talle_medida: z.string(),
  isAvailable: z.boolean().default(false),
});

export type ItemTalleDTO = z.infer<typeof itemTalleSchemaDTO>;
