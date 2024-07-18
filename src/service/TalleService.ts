import { TalleRepository } from '../repository/TalleRepository';

export class TalleService {
  constructor(private _talleRepository: TalleRepository) {}

  async getAll() {
    const results = await this._talleRepository.getAll();
    return results;
  }
}
