import asyncHandler from 'express-async-handler';
import Order from './order.model.js';

const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Không có sản phẩm trong đơn hàng');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                size: item.size,
                product: item._id, 
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'id name email');
    res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        if(req.user.isAdmin || order.user._id.equals(req.user._id)) {
            res.json(order);
        } else {
            res.status(403);
            throw new Error('Không được phép truy cập đơn hàng này');
        }
    } else {
        res.status(404);
        throw new Error('Không tìm thấy đơn hàng');
    }
});
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;

        if (req.body.status === 'Đã giao') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        } else {
            order.isDelivered = false;
            order.deliveredAt = null;
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Không tìm thấy đơn hàng');
    }
});

export { 
    addOrderItems, 
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getMyOrders
};