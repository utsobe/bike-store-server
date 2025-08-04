# 🚴‍♂️ Bike Store Server

A comprehensive RESTful API for managing a bike store inventory and orders system. Built with Node.js, Express, TypeScript, MongoDB, and Zod validation.

## 🌐 Live Demo

**Production URL**: [https://bike-store-server-teal.vercel.app/](https://bike-store-server-teal.vercel.app/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

## ✨ Features

- 🛒 **Product Management**: CRUD operations with validation and soft delete
- 📦 **Order System**: Automatic inventory management with stock validation
- 🔒 **Type Safety**: Full TypeScript + Zod validation
- 🗄️ **MongoDB**: Efficient NoSQL operations with Mongoose ODM
- 📊 **Revenue Tracking**: Calculate total revenue from all orders

## 🛠️ Tech Stack

**Backend**: Node.js, Express.js, TypeScript  
**Database**: MongoDB, Mongoose ODM  
**Validation**: Zod  
**Tools**: ESLint, Prettier, ts-node-dev

## 🚀 API Endpoints

### Products

| Method | Endpoint                       | Description               |
| ------ | ------------------------------ | ------------------------- |
| POST   | `/api/products/create-product` | Create a new bike         |
| GET    | `/api/products`                | Get all bikes             |
| GET    | `/api/products/:productId`     | Get specific bike         |
| PUT    | `/api/products/:productId`     | Update bike details       |
| DELETE | `/api/products/:productId`     | Delete bike (soft delete) |

### Orders

| Method | Endpoint              | Description                            |
| ------ | --------------------- | -------------------------------------- |
| POST   | `/api/orders`         | Create order with inventory management |
| GET    | `/api/orders/revenue` | Get total revenue                      |

## � Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)

### Setup

```bash
# Clone repository
git clone https://github.com/utsobe/bike-store-server.git
cd bike-store-server

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your MongoDB URL

# Run development server
npm run start:dev
```

### Test the API

Visit: `http://localhost:3000` - You should see "App is running!"

## 🔧 Environment Variables

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/bike-store
BCRYPT_SALT_ROUNDS=12
```

## 📜 Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run start:dev`  | Start development server with hot reload |
| `npm run start:prod` | Start production server                  |
| `npm run build`      | Build TypeScript to JavaScript           |
| `npm run lint`       | Run ESLint                               |
| `npm run lint:fix`   | Fix ESLint errors automatically          |

---

**🚴‍♂️ Happy Coding! Built with ❤️ using Node.js & TypeScript**

## API Documentation

### 🛒 Product Schema

```typescript
{
  name: string; // Unique product name
  brand: string; // Bike brand
  price: number; // Price (positive number)
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string; // Product description
  quantity: number; // Stock quantity (integer)
  inStock: boolean; // Auto-managed
  isDeleted: boolean; // Soft delete flag
}
```

### 📦 Order Schema

```typescript
{
  email: string; // Customer email
  product: string; // Product ID
  quantity: number; // Order quantity
  totalPrice: number; // Total order price
}
```

### 📝 Example Usage

**Create Product:**

```bash
POST /api/products/create-product
{
  "name": "Trek Mountain Explorer 2024",
  "brand": "Trek",
  "price": 1299.99,
  "category": "Mountain",
  "description": "High-performance mountain bike",
  "quantity": 15
}
```

**Place Order:**

```bash
POST /api/orders
{
  "email": "customer@example.com",
  "product": "productId",
  "quantity": 2,
  "totalPrice": 2599.98
}
```

### 📊 Response Format

```json
{
  "message": "Operation completed successfully",
  "status": true,
  "data": { ... }
}
```

## 📜 Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run start:dev`  | Start development server with hot reload |
| `npm run start:prod` | Start production server                  |
| `npm run build`      | Build TypeScript to JavaScript           |
| `npm run lint`       | Run ESLint                               |
| `npm run lint:fix`   | Fix ESLint errors automatically          |
| `npm run prettier`   | Format code with Prettier                |
| `npm test`           | Run tests (to be implemented)            |

## 🧪 Testing

### Manual Testing with Postman

1. **Import the following endpoints into Postman:**
   - Base URL: `http://localhost:3000`
2. **Test Product Operations:**
   - Create, read, update, delete products
   - Verify validation errors with invalid data
3. **Test Order Operations:**
   - Place orders and verify inventory updates
   - Test insufficient stock scenarios

### Sample Test Data

**Product Creation:**

```json
{
  "name": "Specialized Speedster Pro",
  "brand": "Specialized",
  "price": 2199.5,
  "category": "Road",
  "description": "Professional road bike with carbon fiber frame",
  "quantity": 8
}
```

## 🚀 Deployment

### Prerequisites for Deployment

- Node.js environment
- MongoDB database (MongoDB Atlas recommended)
- Environment variables configured

### Deployment Steps

1. Build the application: `npm run build`
2. Set production environment variables
3. Start the production server: `npm run start:prod`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the ISC License.

## 🐛 Issue Reporting

If you find any bugs or have feature requests, please create an issue on GitHub with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Email: your-email@example.com

---

**Happy Coding! 🚴‍♂️✨**
