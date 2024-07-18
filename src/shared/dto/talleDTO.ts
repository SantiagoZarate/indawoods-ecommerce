import { z } from 'zod';

export const talleSchemaDTO = z.object({
  medida: z.string(),
});

export type TalleDTO = z.infer<typeof talleSchemaDTO>;
