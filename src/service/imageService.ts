import { ImageRepositoryInterface } from '../repository';
import { ImageInsert } from '../types/imagen';

export class ImageService {
  constructor(private _imageRepository: ImageRepositoryInterface) {}

  async create(newImage: ImageInsert) {
    const results = this._imageRepository.create(newImage);
    return results;
  }

  async deleteByUrl(url: ImageInsert['url']) {
    const results = this._imageRepository.deleteByUrl({ url });
    return results;
  }

  async updatePosition(data: { sort_position: number; id: number }) {
    const results = await this._imageRepository.updatePosition(
      { sort_position: data.sort_position },
      data.id,
    );
    return results;
  }
}
