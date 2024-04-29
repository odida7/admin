import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    media: [String],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    collections: String,
    tags: [String],
    sizes: [String],
    colors: [String],
    price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
    expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }, 
},
   {toJSON: {getters: true}}
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;