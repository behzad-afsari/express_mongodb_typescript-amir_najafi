import ClientError from "../errors/clientError"
import productModel from "../models/productModel"
import { createProductDto } from "./dtos/createProductDto"

export const getAllProducts = async () =>{
    const allproducts = await productModel.find({})
    return (allproducts)
}

export const getOneProducts = async (id:string) =>{
    return ([])
}

export const createNewProduct = async (data: createProductDto) =>{
    try {
        const newProductData  = new productModel(data)
        const productCreated = newProductData.save()
        return (productCreated)
    } catch (error) {
        throw new ClientError();
    }
}

export const updateProduct = async () =>{
    return ([])
}

export const deleteProduct = async (id:string) =>{
    return ([])
}