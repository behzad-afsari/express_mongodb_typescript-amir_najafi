import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ClientError from '../errors/clientError'

export const validatorMiddleWare = (validationSchema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const errors = [];
    const validationClass = plainToInstance(validationSchema, body);

    validate(validationClass, {})
      .then((errors) => {
        if (errors.length > 0) {
          const clientError = new ClientError()
          clientError.data = `${errors.length} errors ocured`
          clientError.errors = errors.map((e : any)=>{
            return {[e.property]: Object.values(e.constraints)}
          })
          res.send(clientError)
        } else {
          next();
        }
      })
      .catch((err) => {
        throw new Error ('error on Validation Data.')
      });
  };
};