import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer does not exists.');
    }

    const productsIdsArray = products.map(product => ({ id: product.id }));

    const foundProducts = await this.productsRepository.findAllById(
      productsIdsArray,
    );

    if (products.length !== foundProducts.length) {
      throw new AppError('One of these products do not exists.');
    }

    const updatedProductArray: {
      product_id: string;
      price: number;
      quantity: number;
    }[] = [];

    foundProducts.forEach(product => {
      products.forEach(updateProduct => {
        if (
          updateProduct.id === product.id &&
          updateProduct.quantity <= product.quantity
        ) {
          updatedProductArray.push({
            product_id: updateProduct.id,
            price: product.price,
            quantity: updateProduct.quantity,
          });

          product.quantity -= updateProduct.quantity;
        } else {
          throw new AppError(
            `insufficient quantities of product: ${product.name}`,
          );
        }
      });
    });

    await this.productsRepository.updateQuantity(foundProducts);

    const order = await this.ordersRepository.create({
      customer,
      products: updatedProductArray,
    });

    return order;
  }
}

export default CreateProductService;
