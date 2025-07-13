import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct): Promise<TProduct> => {
  const result = Product.create(product);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  // getAllProducts,
  // getProductById,
  // updateProduct,
  // deleteProduct,
};
