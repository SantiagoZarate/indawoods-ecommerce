'use server';

import { ZSAError, createServerAction } from 'zsa';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ServiceLocator } from '../../../service/serviceLocator';
import { updateItemsPositionSchema } from '../../../utils/zod-schema-validation/updateItemsPositionSchema';

export const updateItemsPosition = createServerAction()
  .input(updateItemsPositionSchema.array())
  .handler(async ({ input }) => {
    const itemService = ServiceLocator.getService('itemService');

    try {
      await itemService.updatePositions(input);
    } catch (error) {
      throw new ZSAError('ERROR', error);
    }

    revalidatePath('/dashboard', 'page');
    redirect('/dashboard');
  });
