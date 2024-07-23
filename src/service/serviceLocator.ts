import { ImageRepositoryInterface, ItemRepositoryInterface } from '../repository';
import { TalleRepository } from '../repository/TalleRepository';
import { ImageRepository } from '../repository/imageRepository';
import { ItemRepository } from '../repository/itemRepository';
import { ItemTalleRepository } from '../repository/itemTalleRepository';
import { SaleRepository } from '../repository/saleRepository';
import { PaymentService } from './PaymentService';
import { TalleService } from './TalleService';
import { ImageService } from './imageService';
import { ItemService } from './itemService';
import { ItemTalleService } from './itemTalleService';
import { SaleService } from './saleService';

interface ServicesMap {
  imageService: ImageService;
  itemService: ItemService;
  itemTalleService: ItemTalleService;
  talleService: TalleService;
  saleService: SaleService;
  paymentService: PaymentService;
}

interface RepositoryMap {
  imageRepository: ImageRepositoryInterface;
  itemRepository: ItemRepositoryInterface;
  itemTalleRepository: ItemTalleRepository;
  talleRepository: TalleRepository;
  saleRepository: SaleRepository;
}

export class ServiceLocator {
  private static _serviceCache: Partial<ServicesMap> = {};
  private static _repositoryCache: Partial<RepositoryMap> = {};

  private static _serviceFactory: {
    [K in keyof ServicesMap]: () => ServicesMap[K];
  } = {
    itemService: () => {
      const itemRepository = this.getOrCreateRepository('itemRepository');
      return new ItemService(itemRepository);
    },
    imageService: () => {
      const imageRepository = this.getOrCreateRepository('imageRepository');
      return new ImageService(imageRepository);
    },
    itemTalleService: () => {
      const itemTalleRepository = this.getOrCreateRepository('itemTalleRepository');
      return new ItemTalleService(itemTalleRepository);
    },
    talleService: () => {
      const talleRepository = this.getOrCreateRepository('talleRepository');
      return new TalleService(talleRepository);
    },
    saleService: () => {
      const saleRepository = this.getOrCreateRepository('saleRepository');
      return new SaleService(saleRepository);
    },
    paymentService: () => new PaymentService(),
  };

  private static _repositoryFactory: {
    [K in keyof RepositoryMap]: () => RepositoryMap[K];
  } = {
    itemRepository: () => new ItemRepository(),
    imageRepository: () => new ImageRepository(),
    itemTalleRepository: () => new ItemTalleRepository(),
    talleRepository: () => new TalleRepository(),
    saleRepository: () => new SaleRepository(),
  };

  private static getOrCreateRepository<K extends keyof RepositoryMap>(
    key: K,
  ): RepositoryMap[K] {
    const repo = this._repositoryCache[key];
    if (repo) {
      console.log('RETURNING CACHED ' + key);
      return repo;
    }

    const newRepo = this._repositoryFactory[key]();
    this._repositoryCache[key] = newRepo;
    return newRepo;
  }

  static getService<K extends keyof ServicesMap>(key: K): ServicesMap[K] {
    const service = this._serviceCache[key];

    if (service) {
      return service;
    }

    const newService = this._serviceFactory[key]();
    this._serviceCache[key] = newService;
    return newService;
  }
}
