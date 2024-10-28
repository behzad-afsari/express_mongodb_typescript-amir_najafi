import express , {  Router , Request, Response, NextFunction} from "express";
// const router = express.Router()
const router = Router()

import {authMiddleware, validatorMiddleWare} from '../middlewares'

import { getAllProducts,getOneProducts,createNewProduct,updateProduct,deleteProduct } from "./ProductServices";
import { createProductDto } from "./dtos/createProductDto";
import RequestWithUser from '../types/requestWithUser'
import { log } from "console";

router.get('/', async(req : Request,res: Response, next: NextFunction)=>{
    const allProducts = await getAllProducts()
    try {
        res.status(200).send(allProducts)
    } catch (error: any) {
        // res.status(500).send({message : error.message})
        next(error)
    }
})

router.get('/:id', async (req : Request,res: Response, next: NextFunction)=>{
    res.status(200).send(`Get product id ${req.params.id}`)
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/' , authMiddleware,validatorMiddleWare(createProductDto), async ( req: Request, res: Response, next: NextFunction )=>{
    try {
        const newProductData: createProductDto = req.body
        const productCreated = await createNewProduct(newProductData)
        res.status(200).send(productCreated)
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id' ,authMiddleware,validatorMiddleWare(createProductDto), async (req: Request,res: Response, next: NextFunction)=>{
    try {
        const productId = req.params.id
        const newData: createProductDto = req.body
        const userId : string = req.body.user
        const result =await updateProduct(productId,newData,userId)
        // res.status(200).send(`Update  product id ${req.params.id} / data : ${newData}`)
        res.status(200).send(result)
        
    } catch (error) {
        next()
    }
})

router.delete('/:id' ,authMiddleware, async (req: Request,res: Response, next: NextFunction)=>{
    try {
        const productId = req.params.id
        const userId = req.body.user
        const result = await deleteProduct(productId,userId)
        // res.status(200).send(`delete product id ${req.params.id}`)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

export default router