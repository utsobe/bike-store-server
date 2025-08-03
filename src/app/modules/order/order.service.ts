import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder): Promise<TOrder> => {
  const product = await Product.findById(orderData.product);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.isDeleted) {
    throw new Error('Product is no longer available');
  }

  if (product.quantity < orderData.quantity) {
    throw new Error(
      `Insufficient stock. Only ${product.quantity} items available`,
    );
  }

  const result = await Order.create(orderData);

  const newQuantity = product.quantity - orderData.quantity;
  const updateData: any = {
    quantity: newQuantity,
  };

  if (newQuantity === 0) {
    updateData.inStock = false;
  }

  await Product.findByIdAndUpdate(orderData.product, updateData);

  return result;
};

const getTotalRevenueFromDB = async (): Promise<number> => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  console.log('Orders:', orders);
  if (orders.length === 0) {
    return 0;
  }
  return orders[0].totalRevenue;
};

export const OrderService = {
  createOrderIntoDB,
  getTotalRevenueFromDB,
};
