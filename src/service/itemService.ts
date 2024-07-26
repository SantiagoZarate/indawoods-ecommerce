/* eslint-disable  @typescript-eslint/no-non-null-asserted-optional-chain */

import { ItemRepositoryInterface } from '../repository';
import { ItemImagenTalleDTO } from '../shared/dto/itemImagenTalleDTO';
import { ItemToggleVisibility } from '../types/item';
import { CreateItemSchemaServer } from '../utils/zod-schema-validation/itemSchema';
import { updateItemsPositionType } from '../utils/zod-schema-validation/updateItemsPositionSchema';
import { ServiceLocator } from './serviceLocator';

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

  async getRecommended(id: number) {
    const result = await this._itemRepository.getRecommended({ id });
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

  async updatePositions(data: updateItemsPositionType[]) {
    const result = await this._itemRepository.updatePositions(data);
    return result;
  }

  async update(newData: CreateItemSchemaServer, oldData: ItemImagenTalleDTO, id: number) {
    const imageService = ServiceLocator.getService('imageService');
    const itemTalleService = ServiceLocator.getService('itemTalleService');

    // Talles update
    const deleteTalles = oldData.item_talle
      .map((talle) => {
        if (!newData.talles.includes(talle.talle_medida)) {
          return talle.talle_medida;
        }
      })
      .filter(Boolean);

    const insertTalles = newData.talles
      .map((talle) => {
        if (!oldData.item_talle.some((it) => it.talle_medida === talle)) {
          return talle;
        }
      })
      .filter(Boolean);

    deleteTalles.map(async (talle) => {
      await itemTalleService.delete({ id, medida: talle! });
    });

    insertTalles.map(async (talle) => {
      await itemTalleService.create({ id, medida: talle! });
    });

    // Images updates
    const deleteImages = oldData.imagen
      .map((imagen) => {
        if (!newData.imagesURL.some((im) => im.publicUrl === imagen.url)) {
          return imagen;
        }
      })
      .filter(Boolean);

    const insertImages = newData.imagesURL
      .map((image) => {
        if (!oldData.imagen.some((im) => im.url === image.publicUrl)) {
          return image;
        }
      })
      .filter(Boolean);

    const imagesWithNewOrder = newData.imagesURL.map((image) => {
      if (
        oldData.imagen.some(
          (im) => im.url === image.publicUrl && im.sort_position !== image.sort_order,
        )
      )
        return {
          id: oldData.imagen.find((im) => im.url)?.id!,
          sort_position: image.sort_order!,
        };
    });

    imagesWithNewOrder.forEach(async (data) => {
      await imageService.updatePosition({
        id: data?.id!,
        sort_position: data?.sort_position!,
      });
    });

    deleteImages.forEach(async (image) => {
      await imageService.deleteByUrl(image?.url!);
    });

    insertImages.forEach(async (image) => {
      await imageService.create({
        item_id: id,
        sort_position: image?.sort_order!,
        url: image?.publicUrl!,
      });
    });

    // Item Update
    await this._itemRepository.update(
      {
        category: newData.category,
        description: newData.description,
        guia_de_talles: newData.guiaDeTallesPublicURL,
        name: newData.name,
        price: newData.price,
      },
      id,
    );
  }
}
