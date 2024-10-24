import express , {  Request, Response} from "express";
const router = express.Router()

import {userRegiseterService,userLoginService} from './authServices'
import {validatorMiddleWare} from '../middlewares'
import loginDto from './dtos/loginUserDto'
import registerDto from "./dtos/registerUserDto"
import {encodeToken,decodeToken} from '../utils/userToken'

//login
router.post('/login',validatorMiddleWare(loginDto), async (req : Request,res: Response)=>{
    try {
        // const token = encodeToken(req.body.email)
        // console.log(token);
        // const decode = decodeToken(token)
        // console.log(decode);
        
        const result =  await userLoginService(req.body)
        res.send(result)

    } catch (error: any) {
        res.status(500).send({message : error.message})
    }
})

//register
router.post('/register',validatorMiddleWare(registerDto),async (req : Request,res: Response)=>{
    try {
        const result = await userRegiseterService(req.body)
        res.send(result)
    } catch (error: any) {
        res.status(800).json({success : false, msg : error.message})
    }
})





router.post('/forget-password',async (req : Request,res: Response)=>{
    try {
    } catch (error) {
        res.status(400).json({success : false, msg : "user not Found."})
    }
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