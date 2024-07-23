import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { envs } from '../config/envs';
import { redirect } from 'next/navigation';
import { ItemPayment } from '../shared/dto/itemDTO';
import { ServiceLocator } from './serviceLocator';

export class PaymentService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({ accessToken: envs.MP_ACCESS_TOKEN });
  }

  async createPayment(item: ItemPayment) {
    const preference = await new Preference(this.client).create({
      body: {
        back_urls: {
          success: '/payment-succesfull',
          failure: '/payment-failure',
        },
        items: [
          {
            id: String(item.id),
            title: item.name,
            unit_price: item.price,
            quantity: 1,
            description: 'Indawoods item',
          },
        ],
      },
    });

    redirect(preference.sandbox_init_point!);
  }

  async generatePaymentResponse(id: number) {
    console.log('GENERATE PAYMENT RESPONSE');
    const payment = await new Payment(this.client).get({ id });

    console.log(payment);
    if (payment.status === 'approved') {
      const itemID = payment.additional_info!.items![0].id;
      console.log('ITEM ID: ' + itemID);
      const saleService = ServiceLocator.getService('saleService');
      await saleService.create({
        item_id: Number(itemID),
      });
    }
  }
}
