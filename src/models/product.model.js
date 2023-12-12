import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },    
    totalQty: {
        type: Number,
        required: true,
        min: 0,
    },
    availableQty: {
        type: Number,
        required: true,
        min: 0,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);

export default Product;