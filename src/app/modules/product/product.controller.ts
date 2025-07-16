import { Request, Response } from 'express';
import { Product } from './product.model';
import { ProductService } from './product.service';
import productValidationSchema, {
  updateProductValidationSchema,
} from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductService.createProductIntoDB(zodParsedData);
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const results = await ProductService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Bikes retrieved successfully',
      data: results,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to retrieve bikes',
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductByIdFromDB(productId);
    console.log(productId);
    res.status(200).json({
      success: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to retrieve bike',
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Validate the update data using Zod
    const zodParsedData = updateProductValidationSchema.parse(updateData);

    const result = await ProductService.updateProductFromDB(
      productId,
      zodParsedData,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found',
      });
    }

    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update bike',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  // deleteProduct,
};
