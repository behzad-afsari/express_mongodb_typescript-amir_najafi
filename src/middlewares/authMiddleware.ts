import { Request , Response , NextFunction } from "express";


export const authMiddleware = (req: Request, res: Response ,next : NextFunction) => {
    if(req.body.role && req.body.role === "admin"){
        console.log('auth for admin');
        next()
    }else{
        console.log('unauthorized');
        res.status(401).send('unauthorized')
    }
}

