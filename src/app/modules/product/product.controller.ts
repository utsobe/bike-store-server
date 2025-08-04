import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema, {
  updateProductValidationSchema,
} from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Validate incoming product data using Zod schema
    const zodParsedData = productValidationSchema.parse(productData);

    // Create product in database
    const result = await ProductService.createProductIntoDB(zodParsedData);

    // Send success response
    res.status(201).json({
      status: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (error: any) {
    // Handle validation errors and other exceptions
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to create bike',
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Fetch all products from database
    const results = await ProductService.getAllProductsFromDB();

    // Send success response with products data
    res.status(200).json({
      status: true,
      message: 'Bikes retrieved successfully',
      data: results,
    });
  } catch (error: any) {
    // Handle database errors
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to retrieve bikes',
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Fetch specific product from database
    const result = await ProductService.getProductByIdFromDB(productId);
    console.log(productId);

    // Check if product exists
    if (!result) {
      return res.status(404).json({
        status: false,
        message: 'Bike not found',
      });
    }

    // Send success response with product data
    res.status(200).json({
      status: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    // Handle database errors and invalid ObjectId
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to retrieve bike',
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Validate the update data using Zod schema (partial validation)
    const zodParsedData = updateProductValidationSchema.parse(updateData);

    // Update product in database
    const result = await ProductService.updateProductFromDB(
      productId,
      zodParsedData,
    );

    // Check if product exists and was updated
    if (!result) {
      return res.status(404).json({
        status: false,
        message: 'Bike not found',
      });
    }

    // Send success response with updated product data
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    // Handle validation errors and database errors
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to update bike',
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Perform soft delete (set isDeleted: true)
    const result = await ProductService.deleteProductFromDB(productId);

    // Check if product exists and was deleted
    if (!result) {
      return res.status(404).json({
        status: false,
        message: 'Bike not found',
      });
    }

    // Send success response confirming deletion
    res.status(200).json({
      status: true,
      message: 'Bike deleted successfully',
      data: {},
    });
  } catch (error: any) {
    // Handle database errors and invalid ObjectId
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to delete bike',
      error: error,
    });
  }
};

// Export all product controllers
export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
