import { ZodArray, ZodObject, ZodType } from 'zod';
import { ImageDTO } from '../../shared/dto/imageDTO';

type SchemaWithImagen = ZodObject<{
  imagen: ZodArray<ZodType<ImageDTO>>;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAndSort<T extends SchemaWithImagen, K>(data: any, zodSchema: T) {
  const parsedData = zodSchema.parse(data);

  parsedData.imagen.sort((a, b) => a.sort_position - b.sort_position);

  return parsedData as K;
}
