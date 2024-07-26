import { ItemRaw } from './supabase';
import { TalleRaw } from './supabase';

export type ItemTalleInsert = Pick<ItemRaw, 'id'> & Pick<TalleRaw, 'medida'>;
export type ItemTalleDelete = Pick<ItemRaw, 'id'> & Pick<TalleRaw, 'medida'>;
