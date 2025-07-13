import { Request, Response } from 'express';
import { Product } from './product.model';
import { ProductService } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const parsedData = productValidationSchema.parse(productData);

    const result = await ProductService.createProductIntoDB(parsedData);
    res.status(201).json({
      success: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create bike',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  // getAllProducts,
  // getProductById,
  // updateProduct,
  // deleteProduct,
};
