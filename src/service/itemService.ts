import { ItemRepositoryInterface } from '../repository';
import { ItemImageTalleInsert } from '../types/itemImage';
import { ServiceLocator } from './serviceLocator';

export class ItemService {
  constructor(private _itemRepository: ItemRepositoryInterface) {}

  async create(data: ItemImageTalleInsert) {
    const newItem = await this._itemRepository.create({
      category: data.category,
      description: data.description,
      guia_de_talles: data.guia_de_talles,
      name: data.name,
    });

    const imageService = ServiceLocator.getService('imageService');

    data.images.forEach(async (image) => {
      await imageService.create({
        item_id: Number(newItem.id),
        sort_position: image.sort_position,
        url: image.url,
      });
    });

    const itemTalleService = ServiceLocator.getService('itemTalleService');

    data.talles.forEach(async (talle) => {
      await itemTalleService.create({
        medida: talle.medida,
        id: Number(newItem.id),
      });
    });

    console.log(newItem);
  }
}
