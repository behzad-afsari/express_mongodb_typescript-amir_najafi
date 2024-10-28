import mongoose from "mongoose"
import ClientError from "../errors/clientError"
import ServerError from "../errors/serverError"
import productModel from "../models/productModel"
import { createProductDto } from "./dtos/createProductDto"
import {getproductQuerytDto} from './dtos/getproductQuerytDto'

export const getAllProducts = async (filter : getproductQuerytDto) =>{
    const {title,description,start_price,end_price,tags,page,page_size} = filter
    let query : any = {}
    if(tags) query["tags"] = {$in : [tags]}
    if(start_price && end_price) query.price = {$gt: start_price , $lt : end_price}
    //...
    const allproducts = await productModel.find(query , {} , {skip:page_size*(page-1), limit: page_size})
    return (allproducts)
}

export const getOneProducts = async (productId:string) =>{
    try {
        const findProduct = await productModel.findOne({_id:productId})
        if(!findProduct){
            return {message: "product not found"}
        }
        return findProduct
    } catch (error: any) {
        throw new ServerError(400,error? error.message : "bad request");
    }
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