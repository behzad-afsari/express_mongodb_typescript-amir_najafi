import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/userToken";

export const authMiddleware = (req: Request,res: Response,next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(404).send("unAuthorize user");
  } else {
    // console.log('token >>>>>',token);
    try {
      token = token.split(" ")[1];
    //   console.log("clearToken -------", token);
      const verifyToken = decodeToken(token);
      console.log(verifyToken);
      next();
    } catch (error) {
      res.status(401).send("token expired.");
    }
  }
};
