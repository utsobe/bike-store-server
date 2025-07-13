import { z } from 'zod';
import de from 'zod/v4/locales/de.cjs';

// Zod schema for product validation
const productValidationSchema = z.object({
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, 'Name cannot be empty')
    .max(100, 'Name cannot exceed 100 characters'),

  brand: z
    .string({ message: 'Brand must be a string' })
    .min(1, 'Brand cannot be empty')
    .max(50, 'Brand cannot exceed 50 characters'),

  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be a positive number')
    .max(999999.99, 'Price cannot exceed 999,999.99'),

  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    message: 'Category must be one of: Mountain, Road, Hybrid, Electric',
  }),

  description: z
    .string({ message: 'Description must be a string' })
    .min(1, 'Description cannot be empty')
    .max(1000, 'Description cannot exceed 1000 characters'),

  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative'),

  inStock: z
    .boolean({ message: 'inStock must be a boolean' })
    .optional()
    .default(true),
});

export default productValidationSchema;
