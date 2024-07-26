import { BUCKET_IMAGES_NAME } from '../../constants';
import { createClient } from '../../utils/supabase/client';

export async function uploadImage(image: File, imageName: string): Promise<string> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(BUCKET_IMAGES_NAME)
    .upload(imageName, image, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.log(error);
    throw new Error('ERROR UPLOADING IMAGE, CAUSE: ' + error.message);
  }

  const {
    data: { publicUrl },
  } = await supabase.storage.from(BUCKET_IMAGES_NAME).getPublicUrl(imageName);

  return publicUrl;
}
