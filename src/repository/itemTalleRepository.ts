import { itemTalleSchemaDTO } from '../shared/dto/itemTalleDTO';
import { ItemTalleInsert } from '../types/itemTalle';
import { createClient } from '../utils/supabase/server';

export class ItemTalleRepository {
  private _tableName: string = 'item_talle';

  async create({ id, medida }: ItemTalleInsert) {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .insert({ item_id: id, talle_medida: medida })
      .select('*')
      .single();

    if (error) {
      throw new Error('Error inserting a new record in item_talle table');
    }

    return itemTalleSchemaDTO.parse(data);
  }

  async delete({ id, medida }: ItemTalleInsert) {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .delete()
      .eq('item_id', id)
      .eq('talle_medida', medida)
      .select('*')
      .single();

    if (error) {
      throw new Error('Error deleting record in item_talle table');
    }

    return itemTalleSchemaDTO.parse(data);
  }
}
