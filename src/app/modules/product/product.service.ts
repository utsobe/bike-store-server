import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct): Promise<TProduct> => {
  // Create new product document in MongoDB
  const result = Product.create(product);
  return result;
};

const getAllProductsFromDB = async (): Promise<TProduct[]> => {
  // Fetch all products from database (including soft deleted ones)
  const results = await Product.find();
  return results;
};

const getProductByIdFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  // Find product by MongoDB ObjectId
  const result = await Product.findById(productId);
  return result;
};

const updateProductFromDB = async (
  productId: string,
  productData: Partial<TProduct>,
): Promise<TProduct | null> => {
  // Update product and return updated document with validation
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true, // Return updated document
    runValidators: true, // Run mongoose schema validators
  });
  return result;
};

const deleteProductFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  // Soft delete: set isDeleted flag to true
  const result = await Product.findByIdAndUpdate(productId, {
    isDeleted: true,
  });
  return result;
};

// Export all product service functions
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
