import { ItemRepositoryInterface } from '.';
import { Tables } from '../../supabase/types';
import { ItemDTO, itemSchemaDTO } from '../shared/dto/itemDTO';
import { ItemDelete, ItemInsert, ItemUpdate } from '../types/item';
import { createClient } from '../utils/supabase/server';

export class ItemRepository implements ItemRepositoryInterface {
  private _tableName: string = 'item';

  constructor() {}

  async getAll(): Promise<ItemDTO[]> {
    const db = await createClient();
    const { data, error } = await db
      .from(this._tableName)
      .select<'*', Tables<'item'>>('*');

    if (error) {
      throw new Error('Error getting all items');
    }

    return data.map((d) => itemSchemaDTO.parse(d));
  }

  async getOne({ id }: ItemDelete): Promise<ItemDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .select<'*', Tables<'item'>>('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error getting item with id: ' + id);
    }

    return itemSchemaDTO.parse(data);
  }

  async create(payload: ItemInsert): Promise<ItemDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .insert(payload)
      .select<'*', Tables<'item'>>('*')
      .single();

    if (error) {
      throw new Error('Error creating item');
    }

    return itemSchemaDTO.parse(data);
  }

  async update(payload: ItemUpdate): Promise<ItemDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .update(payload)
      .select<'*', Tables<'item'>>('*')
      .single();

    if (error) {
      console.log(error);
      throw new Error('Error');
    }

    return itemSchemaDTO.parse(data);
  }

  async delete({ id }: ItemDelete): Promise<ItemDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .delete()
      .eq('id', id)
      .select<'*', Tables<'item'>>('*')
      .single();

    if (error) {
      throw new Error('Error');
    }

    return itemSchemaDTO.parse(data);
  }
}
