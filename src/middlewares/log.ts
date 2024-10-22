import { Request , Response , NextFunction } from "express";

export const logrequest = (req: Request, res: Response ,next : NextFunction) => {
   console.log(req.url ,"|", Date());
   next()
}

