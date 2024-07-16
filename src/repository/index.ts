import { ItemDelete, ItemInsert, ItemUpdate } from '../types/item';
import { ItemDTO } from '../shared/dto/itemDTO';

export interface ItemRepositoryInterface {
  getAll(): Promise<ItemDTO>;

  getOne(id: ItemDelete): Promise<ItemDTO>;

  create(payload: ItemInsert): Promise<ItemDTO>;

  update(payload: ItemUpdate): Promise<ItemDTO>;
}
