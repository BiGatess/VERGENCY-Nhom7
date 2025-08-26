import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true,
    },
    slug: { type: String, unique: true },
    sortOrder: {
        type: Number,
        default: 99, 
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;