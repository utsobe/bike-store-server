import { z } from 'zod';

// Zod schema for order validation
const orderValidationSchema = z.object({
  email: z
    .string({ message: 'Email must be a string' })
    .min(1, 'Email cannot be empty')
    .email('Please provide a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),

  product: z
    .string({ message: 'Product must be a string' })
    .min(1, 'Product cannot be empty')
    .max(100, 'Product name cannot exceed 100 characters'),

  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int('Quantity must be an integer')
    .positive('Quantity must be a positive number')
    .max(1000, 'Quantity cannot exceed 1000'),

  totalPrice: z
    .number({ message: 'Total price must be a number' })
    .positive('Total price must be a positive number')
    .max(9999999.99, 'Total price cannot exceed 9,999,999.99'),
});

// Schema for creating an order
const createOrderValidationSchema = orderValidationSchema;

// Schema for updating an order (all fields optional)
const updateOrderValidationSchema = orderValidationSchema.partial();

export default orderValidationSchema;
export { createOrderValidationSchema, updateOrderValidationSchema };
