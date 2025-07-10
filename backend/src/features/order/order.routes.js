import express from 'express';

import {
    addOrderItems,
    getOrders,
    updateOrderStatus
} from './order.controller.js';
import { protect, admin } from '../auth/auth.middleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems)       // User thường tạo đơn hàng
    .get(protect, admin, getOrders);    // Admin lấy tất cả đơn hàng

// Route mới để admin cập nhật trạng thái
router.route('/:id/status')
    .put(protect, admin, updateOrderStatus);

export default router;