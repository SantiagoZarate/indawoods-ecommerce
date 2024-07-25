import { ImageDTO } from '../shared/dto/imageDTO';
import { ItemDTO, ItemRecommendedDTO } from '../shared/dto/itemDTO';
import { ItemImageDTO } from '../shared/dto/itemImageDTO';
import { ItemImagenTalleDTO } from '../shared/dto/itemImagenTalleDTO';
import { SaleDTO } from '../shared/dto/saleDTO';
import { ImageDelete, ImageInsert, ImageUpdate } from '../types/imagen';
import {
  ItemDelete,
  ItemInsertRPC,
  ItemToggleVisibility,
  ItemUpdate,
} from '../types/item';
import { SaleDelete, SaleInsert, SaleUpdate } from '../types/sale';
import { updateItemsPositionType } from '../utils/zod-schema-validation/updateItemsPositionSchema';

export interface BaseInterface<DTO, Delete, Insert, Update> {
  getAll(): Promise<DTO[]>;

  getOne(id: Delete): Promise<DTO>;

  create(payload: Insert): Promise<DTO>;

  update(payload: Update, id: number): Promise<DTO>;
}

export interface ItemRepositoryInterface
  extends Omit<
    BaseInterface<ItemDTO, ItemDelete, ItemInsertRPC, ItemUpdate>,
    'getAll' | 'getOne'
  > {
  getAll(): Promise<ItemImageDTO[]>;

  getAllVisible(): Promise<ItemImageDTO[]>;

  toggleVisibility(data: ItemToggleVisibility): Promise<ItemDTO>;

  getOne(id: ItemDelete): Promise<ItemImagenTalleDTO>;

  getRecommended(id: ItemDelete): Promise<ItemRecommendedDTO[]>;

  updatePositions(data: updateItemsPositionType[]): Promise<boolean>;

  delete(id: ItemDelete): Promise<ItemDTO>;
}

export interface ImageRepositoryInterface
  extends BaseInterface<ImageDTO, ImageDelete, ImageInsert, ImageUpdate> {}

export interface SaleRepositoryInterface
  extends BaseInterface<SaleDTO, SaleDelete, SaleInsert, SaleUpdate> {}
