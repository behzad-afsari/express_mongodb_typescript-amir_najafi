import iUser from "./dtos/userDto";
import userModel from "../models/userModel";

export const getAllUsers = async () => {
    const allUsers = await userModel.find()
    return allUsers
};

export const getUserById = async (id: string) => {
    const userFound = await userModel.findOne({_id: id})
    return userFound
};

export const deleteUserbyId = async (id: string) => {
    const userDeleted = await userModel.findOneAndDelete({_id: id})
    return userDeleted
};

export const createNewUser = (user: iUser) => {


    return new Promise((resolve,reject)=>{
        userModel.create(user).then((userCreated) =>{
            resolve(userCreated)
        }).catch((err)=>{
            reject(err)
        })
        
    })
    
};


export const updateUserById = async (id: string , data: iUser) => {
    try {
        const resultUser = await userModel.findByIdAndUpdate({_id:id},data)
        // const resultUser = await userModel.updateOne({id,data})
        return resultUser
    } catch (error ) {
        throw new Error("Error ::" + error);
    }
    
};
