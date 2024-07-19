import { ImageDTO } from '../shared/dto/imageDTO';
import { ItemDTO } from '../shared/dto/itemDTO';
import { ItemImageDTO } from '../shared/dto/itemImageDTO';
import { ItemImagenTalleDTO } from '../shared/dto/itemImagenTalleDTO';
import { ImageDelete, ImageInsert, ImageUpdate } from '../types/imagen';
import { ItemDelete, ItemInsert, ItemUpdate } from '../types/item';

export interface BaseInterface<DTO, Delete, Insert, Update> {
  getAll(): Promise<DTO[]>;

  getOne(id: Delete): Promise<DTO>;

  create(payload: Insert): Promise<DTO>;

  update(payload: Update): Promise<DTO>;
}

export interface ItemRepositoryInterface
  extends Omit<
    BaseInterface<ItemDTO, ItemDelete, ItemInsert, ItemUpdate>,
    'getAll' | 'getOne'
  > {
  getAll(): Promise<ItemImageDTO[]>;

  getAllVisible(): Promise<ItemImageDTO[]>;

  getOne(id: ItemDelete): Promise<ItemImagenTalleDTO>;

  delete(id: ItemDelete): Promise<ItemDTO>;
}

export interface ImageRepositoryInterface
  extends BaseInterface<ImageDTO, ImageDelete, ImageInsert, ImageUpdate> {}
