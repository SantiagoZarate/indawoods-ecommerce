import { NextRequest } from 'next/server';
import { envs } from '../../../config/envs';
import { ServiceLocator } from '../../../service/serviceLocator';

export async function POST(request: NextRequest) {
  console.log('RUNNING PAYMENT HANDLER');

  const body = await request.json();
  const secret = request.headers.get('x-signature-id');
  console.log(request);

  if (secret !== envs.MP_SECRET) {
    return Response.json({ success: false });
  }

  const paymentService = ServiceLocator.getService('paymentService');

  try {
    const results = await paymentService.generatePaymentResponse(body.data.id);
    return Response.json(results);
  } catch (error) {
    console.log(error);
  }
}
