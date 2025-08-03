# 🚴‍♂️ Bike Store Server

A comprehensive RESTful API for managing a bike store inventory and orders system. Built with Node.js, Express, TypeScript, MongoDB, and Zod validation.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)

## ✨ Features

### 🛒 Product Management

- **Create Products**: Add new bikes to inventory with comprehensive validation
- **View Products**: Get all products or specific product by ID
- **Update Products**: Modify product details with partial updates
- **Delete Products**: Soft delete products (sets `isDeleted: true`)
- **Inventory Tracking**: Real-time stock management

### 📦 Order Management

- **Place Orders**: Create orders with automatic inventory management
- **Stock Validation**: Prevents overselling with real-time stock checks
- **Automatic Updates**: Auto-updates product quantities and stock status
- **Email Integration**: Customer email tracking for orders

### 🔒 Data Validation

- **Zod Schemas**: Comprehensive input validation for all endpoints
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Detailed error messages and status codes

### 🗄️ Database Features

- **MongoDB Integration**: Efficient NoSQL database operations
- **Mongoose ODM**: Schema validation and data modeling
- **Timestamps**: Automatic createdAt and updatedAt tracking
- **Soft Deletes**: Products marked as deleted rather than removed

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Zod
- **Code Quality**: ESLint, Prettier
- **Development**: ts-node-dev

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

| Method | Endpoint      | Description                                |
| ------ | ------------- | ------------------------------------------ |
| POST   | `/api/orders` | Create new order with inventory management |

## 📥 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step-by-step Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bike-store-server.git
   cd bike-store-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration (see [Environment Variables](#environment-variables))

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017`

5. **Run the application**

   **Development mode:**

   ```bash
   npm run start:dev
   ```

   **Production mode:**

   ```bash
   npm run build
   npm run start:prod
   ```

6. **Verify installation**
   Open your browser and navigate to `http://localhost:3000`
   You should see: "App is running!"

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/bike-store

# Security (if needed for future features)
BCRYPT_SALT_ROUNDS=12
```

### Environment Variables Description

| Variable             | Description                             | Default                              |
| -------------------- | --------------------------------------- | ------------------------------------ |
| `PORT`               | Server port number                      | 3000                                 |
| `DATABASE_URL`       | MongoDB connection string               | mongodb://localhost:27017/bike-store |
| `BCRYPT_SALT_ROUNDS` | Bcrypt salt rounds for password hashing | 12                                   |

## 💡 Usage

### Creating a Product

```bash
POST /api/products/create-product
Content-Type: application/json

{
  "name": "Trek Mountain Explorer 2024",
  "brand": "Trek",
  "price": 1299.99,
  "category": "Mountain",
  "description": "A high-performance mountain bike designed for rugged terrain",
  "quantity": 15
}
```

### Placing an Order

```bash
POST /api/orders
Content-Type: application/json

{
  "email": "customer@example.com",
  "product": "productId",
  "quantity": 2,
  "totalPrice": 2599.98
}
```

## 📚 API Documentation

### Product Schema

```typescript
{
  name: string; // Unique product name
  brand: string; // Bike brand
  price: number; // Price (positive number)
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string; // Product description
  quantity: number; // Stock quantity (integer)
  inStock: boolean; // Automatically managed
  isDeleted: boolean; // Soft delete flag
}
```

### Order Schema

```typescript
{
  email: string; // Customer email
  product: string; // Product ID
  quantity: number; // Order quantity
  totalPrice: number; // Total order price
}
```

### Response Format

**Success Response:**

```json
{
  "message": "Operation completed successfully",
  "status": true,
  "data": { ... }
}
```

**Error Response:**

```json
{
  "message": "Error description",
  "status": false,
  "error": "Error details"
}
```

## 📁 Project Structure

```
bike-store-server/
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── index.ts          # Environment configuration
│   │   └── modules/
│   │       ├── product/
│   │       │   ├── product.controller.ts
│   │       │   ├── product.interface.ts
│   │       │   ├── product.model.ts
│   │       │   ├── product.route.ts
│   │       │   ├── product.service.ts
│   │       │   └── product.validation.ts
│   │       └── order/
│   │           ├── order.controller.ts
│   │           ├── order.interface.ts
│   │           ├── order.model.ts
│   │           ├── order.route.ts
│   │           ├── order.service.ts
│   │           └── order.validation.ts
│   ├── app.ts                    # Express app configuration
│   └── server.ts                 # Server entry point
├── dist/                         # Compiled JavaScript files
├── .env                          # Environment variables
├── .gitignore
├── eslint.config.mjs            # ESLint configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
└── README.md
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
