import express , {  Router , Request, Response} from "express";
// const router = express.Router()
const router = Router()

import {authMiddleware,validatorMiddleWare} from '../middlewares'
import { getAllUsers } from "./userServices";
import {createUserDto} from './dtos/createUserDto'

router.get('/', (req : Request,res: Response)=>{
    const allUsers = getAllUsers()
    try {
        res.status(200).send(allUsers)
    } catch (error: any) {
        res.status(500).send({message : error.message})
    }
})

router.get('/:id',(req : Request,res: Response)=>{
    res.status(200).send(`Get user id ${req.params.id}`)
})

router.post('/' ,authMiddleware, validatorMiddleWare(createUserDto), (req: Request,res: Response)=>{
    const newUser = req.body
    res.status(200).send(newUser)
})


/* 
{
    "name": "behzad",
    "role": "admin",
    "email":"b@g.com",
    "password":"ahusdb76aj*gR",
    "birthDay":"2024-12-22",
    "site":  "www.behzad.com"
}
 */



router.put('/:id' ,authMiddleware, (req: Request,res: Response)=>{
    const newData = req.body
    res.status(200).send(`Update  user id ${req.params.id} / data : ${newData}`)
})

router.delete('/:id' ,authMiddleware, (req: Request,res: Response)=>{
    res.status(200).send(`delete user id ${req.params.id}`)
})

export default router