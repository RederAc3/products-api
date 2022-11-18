import { connect } from 'mongoose';
import * as dotenv from "dotenv";
import { IBaseProduct, IProduct } from "../interface/product.interface";
import Product from "../models/Product";

dotenv.config();

const { DB_CONNECTION } = process.env

export const findAll = async (): Promise<IProduct[]> => {
    try {
        connect(DB_CONNECTION);
        return await Product.find();
    } catch (err) {
        console.log(err.code);
    }
}

export const find = async (_id: string): Promise<IProduct> => {
    connect(DB_CONNECTION);
    try {
        const products = await Product.find({ _id });

        return products;

    } catch (err) {
        console.log(err.code); 
    }
}

export const create = async (data: IBaseProduct): Promise<IProduct> => {
    try {
        connect(DB_CONNECTION);
        return await new Product({ ...data }).save();
    } catch (err) {
        console.log(err.code);
    }
};

export const update = async (
    _id: string,
    dataUpdate: IBaseProduct
): Promise<IProduct> => {

    const updateDate = Date.now();
    try {
        connect(DB_CONNECTION)
        const updateProducts = await Product.findByIdAndUpdate({ _id }, { ...dataUpdate, updateDate }, { upsert: true, new: true });

        return updateProducts;
    } catch (err) {
        console.log(err.code);
    }
};

export const remove = async (_id: string): Promise<null | void> => {
    try {
        connect(DB_CONNECTION);
        return await Product.findByIdAndDelete((_id));
    } catch (err) {
        console.log(err.code);
    }
};