'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ZSAError, createServerAction } from 'zsa';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { createItemSchemaServer } from '../../../../utils/zod-schema-validation/itemSchema';
import { z } from 'zod';

export const updateItem = createServerAction()
  .input(
    createItemSchemaServer.extend({
      id: z.coerce.number(),
    }),
  )
  .handler(async ({ input }) => {
    const itemService = ServiceLocator.getService('itemService');

    try {
      await itemService.update(input, input.id);
    } catch (error) {
      throw new ZSAError('ERROR', error);
    }

    revalidatePath('/dashboard', 'page');
    redirect('/dashboard');
  });
