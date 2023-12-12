import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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

const Category = mongoose.model('Category', categorySchema);

export default Category;