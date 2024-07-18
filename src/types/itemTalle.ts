import { ItemRaw } from './supabase';
import { TalleRaw } from './supabase';

export type ItemTalleInsert = Pick<ItemRaw, 'id'> & Pick<TalleRaw, 'medida'>;
