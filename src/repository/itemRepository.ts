import { ItemRepositoryInterface } from '.';
import { Tables } from '../../supabase/types';
import { ItemDTO, itemSchemaDTO } from '../shared/dto/itemDTO';
import { ItemImageDTO, itemImageSchemaDTO } from '../shared/dto/itemImageDTO';
import {
  ItemImagenTalleDTO,
  itemImagenTalleSchemaDTO,
} from '../shared/dto/itemImagenTalleDTO';
import { ItemDelete, ItemInsert, ItemToggleVisibility, ItemUpdate } from '../types/item';
import { createClient } from '../utils/supabase/server';

export class ItemRepository implements ItemRepositoryInterface {
  private _tableName: string = 'item';

  constructor() {}

  async getAll(): Promise<ItemImageDTO[]> {
    const db = await createClient();
    const { data, error } = await db.from(this._tableName).select('*, imagen(*)');

    if (error) {
      console.log(error);
      throw new Error('Error getting all items');
    }

    return data.map((d) => itemImageSchemaDTO.parse(d));
  }

  async getOne({ id }: ItemDelete): Promise<ItemImagenTalleDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .select('*,imagen(*),item_talle(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error);
      throw new Error('Error getting item with id: ' + id);
    }

    return itemImagenTalleSchemaDTO.parse(data);
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

  async getAllVisible(): Promise<ItemImageDTO[]> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .select('*,imagen(*)')
      .eq('visible', true);

    if (error) {
      throw new Error('Error getting all visible items');
    }

    return data.map((d) => itemImageSchemaDTO.parse(d));
  }

  async toggleVisibility({ id, visible }: ItemToggleVisibility): Promise<ItemDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .update({ visible: !visible })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error('Error updating item visibility');
    }

    return itemSchemaDTO.parse(data);
  }
}
