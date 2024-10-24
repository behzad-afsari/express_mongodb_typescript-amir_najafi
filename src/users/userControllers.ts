import express , {  Request, Response} from "express";
const router = express.Router()

import {authMiddleware,validatorMiddleWare} from '../middlewares'
import {createUserDto} from './dtos/createUserDto'
import {createNewUser,getUserById,getAllUsers,deleteUserbyId,updateUserById} from './userServices'


router.get('/',authMiddleware, async (req : Request,res: Response)=>{
    try {
        const allUsers = await getAllUsers()
        res.status(200).send(allUsers)
    } catch (error: any) {
        res.status(500).send({message : error.message})
    }
})

router.get('/:id',async (req : Request,res: Response)=>{
    try {
        const user = await getUserById(req.params.id)
        res.status(200).json({success : true,user})
    } catch (error) {
        res.status(400).json({success : false, msg : "user not Found."})
    }
})

router.delete('/:id',async (req : Request,res: Response)=>{
    try {
        const user = await deleteUserbyId(req.params.id)
        res.status(200).json({success : true,user})
    } catch (error) {
        res.status(400).json({success : false, msg : "user not Found."})
    }
})

router.post('/' ,authMiddleware, validatorMiddleWare(createUserDto), async (req: Request,res: Response)=>{
    const userData : createUserDto = req.body
    const result = await createNewUser(userData)
    res.send(result)
})

router.put('/:id' ,authMiddleware, async (req: Request,res: Response)=>{
    const newData = req.body
    const id : string = req.params.id
    const userUpdated = await updateUserById(id,newData)
    // res.status(200).send(`Update  user id ${req.params.id} / data : ${newData}`)
    res.status(200).send(userUpdated)
})

export default router


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