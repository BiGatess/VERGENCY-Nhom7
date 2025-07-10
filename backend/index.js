import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './src/config/database.js';
import authRoutes from './src/features/auth/auth.routes.js';
import categoryRoutes from './src/features/category/category.routes.js';
import orderRoutes from './src/features/order/order.routes.js';
import productRoutes from './src/features/product/product.routes.js';
import userRoutes from './src/features/user/user.routes.js';
import uploadRoutes from './src/features/upload/upload.routes.js';
import { notFound, errorHandler } from './src/middleware/error.middleware.js';

dotenv.config({ path: './.env' });
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy ở cổng ${PORT}`);
});