import { ImageInsert } from './imagen';
import { ItemInsert } from './item';

export type ItemImageInsert = ItemInsert & {
  images: ImageInsert[];
};
