import { ItemRepositoryInterface } from '../repository';
import { ItemToggleVisibility } from '../types/item';
import { CreateItemSchemaServer } from '../utils/zod-schema-validation/itemSchema';

export class ItemService {
  constructor(private _itemRepository: ItemRepositoryInterface) {}

  async create(data: CreateItemSchemaServer) {
    await this._itemRepository.create({
      ...data,
      guia_de_talles: data.guiaDeTallesPublicURL ?? '',
      images: data.imagesURL,
      talles: data.talles,
    });
  }

  async getAll() {
    const results = await this._itemRepository.getAll();
    return results;
  }

  async getAllVisible() {
    const results = await this._itemRepository.getAllVisible();
    return results;
  }

  async getOne(id: number) {
    const result = await this._itemRepository.getOne({ id });
    return result;
  }

  async getOneVisible(id: number) {
    const result = await this._itemRepository.getOne({ id });

    if (!result.visible) {
      return null;
    }

    return result;
  }

  async toggleVisibility(data: ItemToggleVisibility) {
    const result = await this._itemRepository.toggleVisibility(data);
    return result;
  }

  async delete(id: number) {
    const result = await this._itemRepository.delete({ id });
    return result;
  }
}
