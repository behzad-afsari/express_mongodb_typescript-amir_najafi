import express , {  Router , Request, Response} from "express";
// const router = express.Router()
const router = Router()

import {authMiddleware} from '../middlewares'

import { getAllUsers } from "./ProductServices";

router.get('/', (req : Request,res: Response)=>{
    const allUsers = getAllUsers()
    try {
        res.status(200).send(allUsers)
    } catch (error: any) {
        res.status(500).send({message : error.message})
    }
})

router.get('/:id', (req : Request,res: Response)=>{
    res.status(200).send(`Get user id ${req.params.id}`)
})

router.post('/' ,authMiddleware, (req: Request,res: Response)=>{
    const newUser = req.body
    res.status(200).send(newUser)
})

router.put('/:id' ,authMiddleware, (req: Request,res: Response)=>{
    const newData = req.body
    res.status(200).send(`Update  user id ${req.params.id} / data : ${newData}`)
})

router.delete('/:id' ,authMiddleware, (req: Request,res: Response)=>{
    res.status(200).send(`delete user id ${req.params.id}`)
})

export default router