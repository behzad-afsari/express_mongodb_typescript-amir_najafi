import { Request , Response , NextFunction } from "express";
import logger from "../utils/logger";

export const logrequest = (req: Request, res: Response ,next : NextFunction) => {
   // console.log(req.url ,"|", Date.now() , "|" , Date());
   logger.info(req.url ,"|", Date.now() , "|" , Date())
   next()
}

