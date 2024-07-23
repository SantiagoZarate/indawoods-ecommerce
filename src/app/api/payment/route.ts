import { NextRequest } from 'next/server';
import { envs } from '../../../config/envs';
import { ServiceLocator } from '../../../service/serviceLocator';
import { createHmac } from 'crypto';

export async function POST(request: NextRequest) {
  console.log('RUNNING PAYMENT HANDLER');

  const body = await request.json();

  const xSignature = request.headers.get('x-signature')!;
  const xRequestId = request.headers.get('x-request-id')!;

  const searchParams = request.nextUrl.searchParams;
  const dataID = searchParams.get('data.id');

  // Separating the x-signature into parts
  const parts = xSignature.split(',');

  // Initializing variables to store ts and hash
  let ts;
  let hash;

  // Iterate over the values to obtain ts and v1
  parts.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split('=');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === 'ts') {
        ts = trimmedValue;
      } else if (trimmedKey === 'v1') {
        hash = trimmedValue;
      }
    }
  });

  // Generate the manifest string
  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  // Create an HMAC signature
  const hmac = createHmac('sha256', envs.MP_SECRET);
  hmac.update(manifest);

  // Obtain the hash result as a hexadecimal string
  const sha = hmac.digest('hex');

  if (sha !== hash) {
    console.log('CLAVES NO COINCIDEN');
    return Response.json({ success: false, status: 401 });
  }

  const paymentService = ServiceLocator.getService('paymentService');

  try {
    const results = await paymentService.generatePaymentResponse(body.data.id);
    return Response.json(results);
  } catch (error) {
    console.log(error);
  }
}
