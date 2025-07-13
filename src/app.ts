import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

// PARSER
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('App is running!');
});

export default app;
