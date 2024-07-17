import { ImageDTO } from '../shared/dto/imageDTO';
import { ItemDTO } from '../shared/dto/itemDTO';
import { ImageDelete, ImageInsert, ImageUpdate } from '../types/imagen';
import { ItemDelete, ItemInsert, ItemUpdate } from '../types/item';

export interface BaseInterface<DTO, Delete, Insert, Update> {
  getAll(): Promise<DTO[]>;

  getOne(id: Delete): Promise<DTO>;

  create(payload: Insert): Promise<DTO>;

  update(payload: Update): Promise<DTO>;
}

export interface ItemRepositoryInterface
  extends BaseInterface<ItemDTO, ItemDelete, ItemInsert, ItemUpdate> {
  delete(id: ItemDelete): Promise<ItemDTO>;
}

export interface ImageRepositoryInterface
  extends BaseInterface<ImageDTO, ImageDelete, ImageInsert, ImageUpdate> {}
