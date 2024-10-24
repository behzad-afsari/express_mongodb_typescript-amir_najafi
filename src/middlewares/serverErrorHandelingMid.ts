import { ErrorRequestHandler, NextFunction,Request, Response} from "express"
import ServerError from '../errors/serverError'
import logger from "../utils/logger"

export const ErrorHandelingMiddleware = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction)=>{
    logger.error(error)
    if(error instanceof ServerError){
        res.status(error.status).send({
            status : error.status,
            message: error.message
        })
    }else{
        res.status(500).send({
            status: 500,
            message : 'Internal Server Error'
        })
    }
}