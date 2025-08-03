import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Validate the order data using Zod
    const zodParsedData = orderValidationSchema.parse(orderData);

    const result = await OrderService.createOrderIntoDB(zodParsedData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    // Handle specific error cases
    if (error.message.includes('Product not found')) {
      return res.status(404).json({
        message: 'Product not found',
        status: false,
        error: error.message,
      });
    }

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

    res.status(400).json({
      message: error.message || 'Failed to create order',
      status: false,
      error: error,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    // Logic to calculate total revenue can be added here
    const totalRevenue = await OrderService.getTotalRevenueFromDB();
    // For now, returning a placeholder response
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to retrieve total revenue',
      status: false,
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getTotalRevenue,
};
