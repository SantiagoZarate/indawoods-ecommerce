'use server';

import { createServerAction } from 'zsa';
import { ServiceLocator } from '../../../../service/serviceLocator';
import { itemPaymentSchema } from '../../../../shared/dto/itemDTO';

export const buyItem = createServerAction()
  .input(itemPaymentSchema)
  .handler(async ({ input }) => {
    const paymentService = ServiceLocator.getService('paymentService');
    await paymentService.createPayment(input);
  });
