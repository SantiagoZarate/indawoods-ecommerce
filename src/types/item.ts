import { type ItemRaw } from './supabase';

export type ItemSelect = Pick<ItemRaw, 'id'>;
export type ItemInsert = Pick<
  ItemRaw,
  'category' | 'name' | 'description' | 'guia_de_talles'
>;
export type ItemDelete = Pick<ItemRaw, 'id'>;
export type ItemUpdate = ItemInsert & Pick<ItemRaw, 'id'>;
export type ItemToggleVisibility = Pick<ItemRaw, 'id' | 'visible'>;
