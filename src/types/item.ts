import { type ItemRaw } from './supabase';

export type ItemSelect = Pick<ItemRaw, 'id'>;
export type ItemInsert = Pick<
  ItemRaw,
  'category' | 'name' | 'description' | 'guia_de_talles' | 'price'
>;
export type ItemDelete = Pick<ItemRaw, 'id'>;
export type ItemUpdate = Partial<ItemInsert>;
export type ItemToggleVisibility = Pick<ItemRaw, 'id' | 'visible'>;

export type ItemInsertRPC = ItemInsert & {
  images: {
    publicUrl: string;
    sort_order: number;
  }[];
  talles: string[];
};
