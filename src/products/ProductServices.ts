import mongoose from "mongoose"
import ClientError from "../errors/clientError"
import ServerError from "../errors/serverError"
import productModel from "../models/productModel"
import { createProductDto } from "./dtos/createProductDto"

export const getAllProducts = async () =>{
    const allproducts = await productModel.find({})
    return (allproducts)
}

export const getOneProducts = async (id:string) =>{
    return ([])
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createNewProduct = async (data: createProductDto) =>{
    try {
        const newProductData  = new productModel(data)
        const productCreated = newProductData.save()
        return (productCreated)
    } catch (error) {
        throw new ServerError(400,"bad request");
    }
}

export const updateProduct = async (productId: string,newData: createProductDto,userId: string) =>{
    try {
        const findProduct = await productModel.findOne({_id:productId ,user:userId})
        if(!findProduct){
            throw new Error("product not found or User is not owner for this product")
        }
        newData.user = userId  
        const productUpdated = await productModel.updateOne({_id: productId},{$set : newData})
        return productUpdated
    } catch (error: any) {
        throw new ServerError(400,error);
    }
}

export const deleteProduct = async (productId:string, userId: string) =>{
    try {
        const findProduct = await productModel.findOne({_id:productId ,user:userId})
        if(!findProduct){
            throw new Error("product not found or User is not owner for this product")
        }
        // const result = await productModel.findOneAndDelete({_id:id, user: userId})
        const result = await productModel.deleteOne({_id:productId, user: userId})
        return result
    } catch (error: any) {
        throw new ServerError(400,error? error.message : "bad request");
    }
}