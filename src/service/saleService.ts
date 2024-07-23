import { SaleRepository } from '../repository/saleRepository';
import { SaleInsert, SaleSelect } from '../types/sale';

export class SaleService {
  constructor(private _saleRepository: SaleRepository) {}

  async getAll() {
    const results = await this._saleRepository.getAll();
    return results;
  }

  async getOne(id: SaleSelect) {
    const results = await this._saleRepository.getOne(id);
    return results;
  }

  async create(data: SaleInsert) {
    const results = await this._saleRepository.create(data);
    return results;
  }
}
