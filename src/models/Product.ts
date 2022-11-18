import { Schema, model } from 'mongoose';
import { IProduct } from "../interface/product.interface";

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    updateDate: {
        type: Date,
    }
});

const Product =  model<IProduct>('products', ProductSchema);

export default Product;