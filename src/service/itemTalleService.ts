import { ItemTalleRepository } from '../repository/itemTalleRepository';
import { ItemTalleDelete, ItemTalleInsert } from '../types/itemTalle';

export class ItemTalleService {
  constructor(private _itemTalleRepository: ItemTalleRepository) {}

  async create(data: ItemTalleInsert) {
    const results = this._itemTalleRepository.create(data);
    return results;
  }

  async delete(data: ItemTalleDelete) {
    const results = this._itemTalleRepository.delete(data);
    return results;
  }
}
