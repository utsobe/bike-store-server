import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder): Promise<TOrder> => {
  //   const result = await Order.create(orderData);
  //   Product.findByIdAndUpdate(orderData.product, {
  //     $inc: { stock: -orderData.quantity },
  //   }).catch((error) => {
  //     console.error('Error updating product stock:', error);
  //   });
  const isProductExists = await Product.findById(orderData.product);
  if (!isProductExists) {
    throw new Error('Product not found');
  }
  const result = await Order.create(orderData);
  console.log(`Stock updated for product ${orderData.quantity}`);
  const result2 = await Product.findByIdAndUpdate(orderData.product, {
    $inc: { stock: -orderData.quantity },
  }).catch((error) => {
    console.error('Error updating product stock:', error);
  });
  console.log(result2);
  if (!result) {
    throw new Error('Failed to create order');
  }
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
