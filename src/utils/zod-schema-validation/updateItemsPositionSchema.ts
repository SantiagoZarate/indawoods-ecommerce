import { z } from 'zod';
import { itemSchemaDTO } from '../../shared/dto/itemDTO';

export const updateItemsPositionSchema = itemSchemaDTO.pick({
  id: true,
  sort_position: true,
});

export type updateItemsPositionType = z.infer<typeof updateItemsPositionSchema>;
