'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ZSAError, createServerAction } from 'zsa';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { createItemSchemaServer } from '../../../../utils/zod-schema-validation/itemSchema';
import { z } from 'zod';
import { itemImagenTalleSchemaDTO } from '../../../../shared/dto/itemImagenTalleDTO';

export const updateItem = createServerAction()
  .input(
    z.object({
      new: createItemSchemaServer,
      old: itemImagenTalleSchemaDTO,
      id: z.coerce.number(),
    }),
  )
  .handler(async ({ input }) => {
    const itemService = ServiceLocator.getService('itemService');

    try {
      await itemService.update(input.new, input.old, input.id);
    } catch (error) {
      console.log(error);
      throw new ZSAError('ERROR', error);
    }

    revalidatePath('/dashboard', 'page');
    redirect('/dashboard');
  });
