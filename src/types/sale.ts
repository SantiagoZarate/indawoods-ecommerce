import { SaleRaw } from './supabase';

export type SaleInsert = Pick<SaleRaw, 'item_id'>;
export type SaleDelete = Pick<SaleRaw, 'id'>;
export type SaleUpdate = Pick<SaleRaw, 'amount'>;
export type SaleSelect = Pick<SaleRaw, 'id'>;
