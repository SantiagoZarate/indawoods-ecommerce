import { SaleRepositoryInterface } from '.';
import { SaleDTO, saleSchemaDTO } from '../shared/dto/saleDTO';
import { SaleDelete, SaleInsert, SaleUpdate } from '../types/sale';
import { createClient } from '../utils/supabase/server';

export class SaleRepository implements SaleRepositoryInterface {
  private _tableName: string = 'sale';

  async getAll(): Promise<SaleDTO[]> {
    const db = await createClient();
    const { data, error } = await db.from(this._tableName).select('*');

    if (error) {
      throw new Error('Method not implemented.');
    }

    return data.map((d) => saleSchemaDTO.parse(d));
  }
  async getOne(id: SaleDelete): Promise<SaleDTO> {
    const db = await createClient();
    const { data, error } = await db.from(this._tableName).select('*');
    if (error) {
      throw new Error('Method not implemented.' + id);
    }

    return saleSchemaDTO.parse(data);
  }

  async create(payload: SaleInsert): Promise<SaleDTO> {
    const db = await createClient();

    const { data, error } = await db
      .rpc('insert_sale_record', {
        _item_id: payload.item_id,
      })
      .select('*')
      .single();

    if (error) {
      throw new Error('Error inserting into sale table.');
    }

    return saleSchemaDTO.parse(data);
  }

  async update(payload: SaleUpdate): Promise<SaleDTO> {
    const db = await createClient();
    const { data, error } = await db.from(this._tableName).select('*');

    if (error) {
      throw new Error('Method not implemented.' + payload);
    }

    return saleSchemaDTO.parse(data);
  }
}
