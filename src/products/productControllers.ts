import express , {  Router , Request, Response, NextFunction} from "express";
// const router = express.Router()
const router = Router()

import {authMiddleware} from '../middlewares'

import { getAllProducts,getOneProducts,createNewProduct,updateProduct,deleteProduct } from "./ProductServices";
import { createProductDto } from "./dtos/createProductDto";
import RequestWithUser from '../types/requestWithUser'

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
router.post('/' , authMiddleware, async ( req: Request, res: Response, next: NextFunction )=>{
    try {
        const newProductData: createProductDto = req.body
        const productCreated = await createNewProduct(newProductData)
        res.status(200).send(productCreated)
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id' ,authMiddleware, async (req: Request,res: Response, next: NextFunction)=>{
    const newData = req.body
    res.status(200).send(`Update  product id ${req.params.id} / data : ${newData}`)
})

router.delete('/:id' ,authMiddleware, async (req: Request,res: Response, next: NextFunction)=>{
    res.status(200).send(`delete product id ${req.params.id}`)
})

export default router