import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/userToken";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import RequestWithUser from '../types/requestWithUser'

export const authMiddleware = async (req: Request, res: Response,next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(404).send("unAuthorize user");
  } else {
    try {
      token = token.split(" ")[1];
      const verifyToken : any = decodeToken(token);
      req.body.user = verifyToken.id
      // console.log('verifyToken :',verifyToken);

      ///////// if you whant get user info from database that send request.
      // if(verifyToken && verifyToken.id ){
      //   const user = await userModel.findById(verifyToken.id)
      //   console.log(user);
      // }

      logger.warn(JSON.stringify(verifyToken))
      next();
    } catch (error) {
      res.status(401).send("token expired.");
    }
  }
};
