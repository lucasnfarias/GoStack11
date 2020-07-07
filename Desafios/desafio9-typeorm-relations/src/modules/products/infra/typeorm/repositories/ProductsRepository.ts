import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const products = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(products);

    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const idsArray = products.map(product => product.id);

    const findProducts = await this.ormRepository.findByIds(idsArray);

    return findProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const idsArray = products.map(product => product.id);

    const findProducts = await this.ormRepository.find({
      id: In(idsArray),
    });

    const updatedProducts = findProducts.map(product => {
      products.forEach(newProduct => {
        if (product.id === newProduct.id) {
          Object.assign(product, { quantity: Number(newProduct.quantity) });
        }
      });
      return product;
    });

    await this.ormRepository.save(updatedProducts);

    return updatedProducts;
  }
}

export default ProductsRepository;
