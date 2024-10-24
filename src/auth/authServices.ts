import bcrypt from 'bcrypt'

import userModel from "../models/userModel";
import loginDto from "./dtos/loginUserDto";
import { encodeToken, decodeToken } from "../utils/userToken";
import { log } from 'console';

export const userLoginService = async (data: loginDto) => {
  const userFound = await userModel.findOne({ email: data.email });
  if (userFound && userFound.id && userFound.password) {
    ///
    // console.log(userFound);
    // console.log(data.password);
    // const hashPassword = await bcrypt.hash(data.password,10);
    // const hashPassword2 = await bcrypt.hash(data.password,10);
    // console.log(hashPassword);
    // console.log(hashPassword2);
    // console.log(userFound.password);
    // bcrypt.compare(userFound.password, `${data.password}`,(err,result)=>{
    //   if(err) console.log('errrrrror:',err);
    //   console.log('++++',result);
    // })
    
    const compair = await bcrypt.compare(data.password,userFound.password)
    console.log('compair:',compair);
    if (!compair) throw new Error("password incorect!.");
    const token = encodeToken({ id: userFound.id });
    return { token, id: userFound.id };
  } else {
    throw new Error("user not found.");
  }
};

export const userRegiseterService = async (body:any) => {
  try {
    const userFound = await userModel.findOne({ email: body.email });
    if (userFound) throw new Error("user whit this email alredy exist");
    console.log(body);
    
    // body.password = hashPassword
    // console.log(body);
    // const newUser = new userModel(body)
    
    const hashPassword = await bcrypt.hash(body.password,10);
    const newUser = new userModel({...body,password: hashPassword})
    const newUserRegisterd = await newUser.save()
    return newUserRegisterd
  } catch (error : any) {
    throw new Error(error.message);
  }
};
