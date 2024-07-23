import { NextRequest } from 'next/server';
import { ServiceLocator } from '../../service/serviceLocator';
import { envs } from '../../config/envs';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const secret = request.headers.get('x-signature-id');

  if (secret !== envs.MP_SECRET) {
    console.log('NO COINCIDE LA CLAVE');
    // return Response.json({ success: false });
  }

  const paymentService = ServiceLocator.getService('paymentService');

  try {
    const results = await paymentService.generatePaymentResponse(body.data.id);
    return Response.json(results);
  } catch (error) {
    console.log(error);
  }
}
