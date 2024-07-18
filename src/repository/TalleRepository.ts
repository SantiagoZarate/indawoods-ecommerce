import { talleSchemaDTO } from '../shared/dto/talleDTO';
import { createClient } from '../utils/supabase/server';

export class TalleRepository {
  private _tableName: string = 'talle';

  async getAll() {
    const db = await createClient();
    const { data, error } = await db.from(this._tableName).select('*');

    if (error) {
      throw new Error('Error getting all the talles');
    }

    return data.map((d) => talleSchemaDTO.parse(d));
  }
}
