import { ImageInsert } from './imagen';
import { ItemInsert } from './item';
import { TalleInsert } from './talle';

export type ItemImageTalleInsert = ItemInsert & {
  images: ImageInsert[];
  talles: TalleInsert[];
};
