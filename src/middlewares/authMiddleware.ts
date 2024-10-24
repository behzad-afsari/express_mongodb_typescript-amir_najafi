import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/userToken";
import userModel from "../models/userModel";

export const authMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(404).send("unAuthorize user");
  } else {
    // console.log('token >>>>>',token);
    try {
      token = token.split(" ")[1];
    //   console.log("clearToken -------", token);
    const verifyToken : any = decodeToken(token);
    console.log(verifyToken);
      if(verifyToken && verifyToken.id ){
        const user = await userModel.findById(verifyToken.id)
        console.log(user);
      }
      next();
    } catch (error) {
      res.status(401).send("token expired.");
    }
  }
};
