import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to filter out deleted products
productSchema.pre('find', function (next) {
  this.where({ isDeleted: false });
  next();
});

productSchema.pre('findOne', function (next) {
  this.where({ isDeleted: false });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { isDeleted: false },
  });
  next();
});

export const Product = model<TProduct>('Product', productSchema);
