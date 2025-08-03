import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // Here you would typically validate the orderData
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderService.createOrderIntoDB(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create order',
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
};
