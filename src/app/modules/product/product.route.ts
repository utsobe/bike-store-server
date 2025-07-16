import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductController.createProduct);
router.put('/:productId', ProductController.updateProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);

export const ProductRoutes = router;
