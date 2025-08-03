import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct): Promise<TProduct> => {
  const result = Product.create(product);
  return result;
};

const getAllProductsFromDB = async (): Promise<TProduct[]> => {
  const results = await Product.find();
  return results;
};

const getProductByIdFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductFromDB = async (
  productId: string,
  productData: Partial<TProduct>,
): Promise<TProduct | null> => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  const result = await Product.findByIdAndUpdate(productId, {
    isDeleted: true,
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
