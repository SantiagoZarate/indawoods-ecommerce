import { ItemRepositoryInterface } from '../repository';
import { ItemImageInsert } from '../types/itemImage';

export class ItemService {
  private _itemRepository: ItemRepositoryInterface;

  constructor(repository: ItemRepositoryInterface) {
    this._itemRepository = repository;
  }

  async create(data: ItemImageInsert) {
    const newItem = await this._itemRepository.create({
      category: data.category,
      description: data.description,
      guia_de_talles: data.guia_de_talles,
      name: data.name,
    });
    console.log(newItem);
  }
}
