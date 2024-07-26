import { ImageRaw } from './supabase';

export type ImageSelect = Pick<ImageRaw, 'id'>;
export type ImageInsert = Pick<ImageRaw, 'sort_position' | 'url' | 'item_id'>;
export type ImageDelete = Pick<ImageRaw, 'id'>;
export type ImageUpdate = Partial<ImageInsert>;
