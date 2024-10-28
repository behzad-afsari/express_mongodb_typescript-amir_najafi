import jwt from 'jsonwebtoken'

const JWT_SECRET = "behzad"

export const encodeToken = (payload: {} )=> {
    const token = jwt.sign(payload,JWT_SECRET,{expiresIn: "1h"})
    return token
}

export const decodeToken = (token: string) =>{
    const verifyToken = jwt.verify(token,JWT_SECRET)
    // console.log(verifyToken);
    return verifyToken
}