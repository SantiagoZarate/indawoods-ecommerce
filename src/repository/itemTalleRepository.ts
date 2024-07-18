import { itemTalleSchemaDTO } from '../shared/dto/itemTalleDTO';
import { ItemTalleInsert } from '../types/itemTalle';
import { createClient } from '../utils/supabase/server';

export class ItemTalleRepository {
  private _tableName: string = 'item_talle';

  async create(payload: ItemTalleInsert) {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new Error('Error inserting a new record in item_talle table');
    }

    return itemTalleSchemaDTO.parse(data);
  }
}
