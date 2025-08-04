import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Validate incoming order data using Zod schema
    const zodParsedData = orderValidationSchema.parse(orderData);

    // Create order with inventory management (stock reduction)
    const result = await OrderService.createOrderIntoDB(zodParsedData);

    // Send success response
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    // Handle specific inventory-related errors
    if (error.message.includes('Product not found')) {
      return res.status(404).json({
        message: 'Product not found',
        status: false,
        error: error.message,
      });
    }

    // Handle stock-related errors
    if (
      error.message.includes('Insufficient stock') ||
      error.message.includes('no longer available')
    ) {
      return res.status(400).json({
        message: error.message,
        status: false,
        error: 'Inventory Error',
      });
    }

    // Handle validation errors and other exceptions
    res.status(400).json({
      message: error.message || 'Failed to create order',
      status: false,
      error: error,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    // Calculate total revenue using aggregation pipeline
    const totalRevenue = await OrderService.getTotalRevenueFromDB();

    // Send success response with revenue data
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    // Handle database errors
    res.status(500).json({
      message: error.message || 'Failed to retrieve total revenue',
      status: false,
      error: error,
    });
  }
};

// Export all order controllers
export const OrderController = {
  createOrder,
  getTotalRevenue,
};
