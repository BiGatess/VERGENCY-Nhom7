import Product from './product.model.js';
import Category from '../category/category.model.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
    const { category: categoryName, sortBy: sortOrder } = req.query;

    let filter = {};

    if (categoryName) {
        const category = await Category.findOne({ 
            name: new RegExp('^' + categoryName + '$', 'i') 
        });

        if (category) {
            filter.category = category._id;
        } else {
            return res.json([]); 
        }
    }

    let sortOptions = {};
    if (sortOrder === 'price-asc') {
        sortOptions = { price: 1 }; 
    } else if (sortOrder === 'price-desc') {
        sortOptions = { price: -1 }; 
    } else if (sortOrder === 'oldest') {
        sortOptions = { createdAt: 1 };
    } else {
        sortOptions = { createdAt: -1 }; 
    }

    const products = await Product.find(filter)
                                .populate('category', 'name')
                                .sort(sortOptions);
                                
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Sản phẩm không tồn tại');
    }
});

const createProduct = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('Sản phẩm phải có ít nhất một hình ảnh.');
    }

    const imagesArray = req.files.map(file => `/images/${file.filename}`);

    const { 
        name, 
        price, 
        priceBeforeDiscount, 
        description, 
        sku, 
        category, 
        countInStock,
        sizes 
    } = req.body; 

    const sizesArray = Array.isArray(sizes) ? sizes : (sizes ? [sizes] : []);
    
    const product = new Product({
        user: req.user._id, 
        name,
        sku,
        images: imagesArray,
        description,
        price: Number(price), 
        priceBeforeDiscount: Number(priceBeforeDiscount),
        countInStock: Number(countInStock),
        sizes: sizesArray, 
        category, 
    });

    const createdProduct = await product.save();

    console.log('--- Sản phẩm đã được lưu vào database THÀNH CÔNG ---');
    res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };