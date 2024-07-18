import { ItemRepositoryInterface } from '../repository';
import { CreateItemSchemaServer } from '../utils/zod-schema-validation/itemSchema';
import { ServiceLocator } from './serviceLocator';

export class ItemService {
  constructor(private _itemRepository: ItemRepositoryInterface) {}

  async create(data: CreateItemSchemaServer) {
    console.log('CREANDO ITEM');
    await this._itemRepository
      .create({
        category: data.category,
        description: data.description,
        guia_de_talles: data.guiaDeTallesPublicURL ?? '',
        name: data.name,
      })
      .then((res) => {
        const imageService = ServiceLocator.getService('imageService');
        const itemTalleService = ServiceLocator.getService('itemTalleService');

        console.log('CREANDO IMAGENES');
        data.imagesURL.forEach(async (image) => {
          await imageService.create({
            item_id: Number(res.id),
            sort_position: image.sort_order,
            url: image.publicUrl,
          });
        });

        console.log('CREANDO RELACION ITEM TALLE');
        data.talles.forEach(async (talle) => {
          await itemTalleService.create({
            medida: talle,
            id: Number(res.id),
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async getAllForHomepage() {
    const results = this._itemRepository.getAll();
    return results;
  }
}
