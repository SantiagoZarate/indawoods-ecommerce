import { ImageRepositoryInterface } from '.';
import { Tables } from '../../supabase/types';
import { ImageDTO, imageSchemaDTO } from '../shared/dto/imageDTO';
import { ImageDelete, ImageInsert, ImageUpdate } from '../types/imagen';
import { createClient } from '../utils/supabase/server';

export class ImageRepository implements ImageRepositoryInterface {
  private _tableName: string = 'imagen';

  async getAll(): Promise<ImageDTO[]> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .select<'*', Tables<'imagen'>>('*');

    if (error) {
      throw new Error('Error');
    }

    return data.map((d) => imageSchemaDTO.parse(d));
  }

  async getOne({ id }: ImageDelete): Promise<ImageDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .select<'*', Tables<'imagen'>>('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error');
    }

    return imageSchemaDTO.parse(data);
  }

  async create(payload: ImageInsert): Promise<ImageDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .insert<ImageInsert>(payload)
      .select<'*', Tables<'imagen'>>('*')
      .single();

    if (error) {
      console.log(error);
      throw new Error('Error');
    }

    return imageSchemaDTO.parse(data);
  }

  async update(payload: ImageUpdate): Promise<ImageDTO> {
    const db = await createClient();

    const { data, error } = await db
      .from(this._tableName)
      .update(payload)
      .select<'*', Tables<'imagen'>>('*')
      .single();

    if (error) {
      throw new Error('Error');
    }

    return imageSchemaDTO.parse(data);
  }
}
