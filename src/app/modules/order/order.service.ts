import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder): Promise<TOrder> => {
  // Step 1: Verify product exists in database
  const product = await Product.findById(orderData.product);
  if (!product) {
    throw new Error('Product not found');
  }

  // Step 2: Check if product is soft deleted
  if (product.isDeleted) {
    throw new Error('Product is no longer available');
  }

  // Step 3: Validate sufficient stock is available
  if (product.quantity < orderData.quantity) {
    throw new Error(
      `Insufficient stock. Only ${product.quantity} items available`,
    );
  }

  // Step 4: Create the order document
  const result = await Order.create(orderData);

  // Step 5: Update product inventory
  const newQuantity = product.quantity - orderData.quantity;
  const updateData: any = {
    quantity: newQuantity,
  };

  // Step 6: Set inStock to false if quantity becomes zero
  if (newQuantity === 0) {
    updateData.inStock = false;
  }

  // Step 7: Apply inventory updates to product
  await Product.findByIdAndUpdate(orderData.product, updateData);

  return result;
};

const getTotalRevenueFromDB = async (): Promise<number> => {
  // Use aggregation pipeline to calculate sum of all order total prices
  const orders = await Order.aggregate([
    {
      // Group all documents and sum totalPrice field
      $group: {
        _id: null, // Group all documents together
        totalRevenue: { $sum: '$totalPrice' }, // Sum all totalPrice values
      },
    },
  ]);

  // Debug log for development
  console.log('Orders:', orders);

  // Return 0 if no orders exist, otherwise return calculated total
  if (orders.length === 0) {
    return 0;
  }
  return orders[0].totalRevenue;
};

// Export all order service functions
export const OrderService = {
  createOrderIntoDB,
  getTotalRevenueFromDB,
};
