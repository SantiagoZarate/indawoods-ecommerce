import { ImageRepositoryInterface } from '../repository';
import { ImageInsert } from '../types/imagen';

export class ImageService {
  constructor(private _imageRepository: ImageRepositoryInterface) {}

  async create(newImage: ImageInsert) {
    const results = this._imageRepository.create(newImage);
    return results;
  }
}
