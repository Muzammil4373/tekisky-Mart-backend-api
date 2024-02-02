
import ProductModel from "../models/productModel.js";

import mongoose from 'mongoose';

const generateProductId = async () => {
    try {
        const productId = new mongoose.Types.ObjectId().toHexString();
        return productId;
    } catch (error) {
        throw new Error("Failed to generate product ID: " + error.message);
    }
};

export const addProductSerivce = async (data, imageUrl) => {
    const productId = await generateProductId();
    try {
        const newProduct = new ProductModel({ ...data, imageURL: imageUrl, productId: productId });

        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        return 'successfull';
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation error:", error.message);
            throw new Error("Validation error");
        } else {
            console.error("Error adding product:", error);
            throw new Error("Failed to add product");
        }
    }
};



// Assuming this file is productServices.js


export const getProductService = async () => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.find();
        // const {availableStockQty} = products
        //console.log(availableStockQt)


        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in fetching products:', error);
        throw new Error('Error in fetching products');
    }
};

export const productUpdateService = async (id, updatedData) => {
    try {
        // Update a product in the database using Mongoose
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        return updatedProduct; // Return the updated product
    } catch (error) {
        // Handle any errors that occur during the update
        console.error('Error in updating the product:', error);
        throw new Error('Error in updating the product');
    }
};


export const productDeleteService = async (id) => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.findByIdAndDelete({ _id: id });
        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in deleting the  products:', error);
        throw new Error('Error in deleting products');
    }
};




export const getOneProductService = async (productId) => {
    try {
        const product = await ProductModel.findOne({ _id: productId }).exec();

        if (!product) {
            console.error(`Product not found for the given ID: ${productId}`);
            return null; // Return null or an empty object
        }

        return product;
    } catch (error) {
        console.error('Error while getting product:', error);
        throw error; // Re-throw the error to propagate it
    }
};


export const dealOfTheDayService = async () => {
    try {
        const dealProduct = await ProductModel.findOne({ dealOfDay: true })
        return dealProduct
    } catch (error) {
        console.error('Error while getting dealProduct:', error);
        throw error; // Re-throw the error to propagate it
    }



}