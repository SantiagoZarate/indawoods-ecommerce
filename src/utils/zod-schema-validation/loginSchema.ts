import { z } from 'zod';

export const loginSchema = z.object({
  password: z.string().min(6, { message: 'password must at least have 6 characters' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
