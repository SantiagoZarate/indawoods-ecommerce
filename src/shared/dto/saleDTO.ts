import { z } from 'zod';

export const saleSchemaDTO = z.object({
  id: z.number(),
  amount: z.number(),
  item_id: z.number(),
  created_at: z.string(),
});

export type SaleDTO = z.infer<typeof saleSchemaDTO>;
