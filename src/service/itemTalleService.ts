import { ItemTalleRepository } from '../repository/itemTalleRepository';
import { ItemTalleInsert } from '../types/itemTalle';

export class ItemTalleService {
  constructor(private _itemTalleRepository: ItemTalleRepository) {}

  async create(data: ItemTalleInsert) {
    const results = this._itemTalleRepository.create(data);
    return results;
  }
}
