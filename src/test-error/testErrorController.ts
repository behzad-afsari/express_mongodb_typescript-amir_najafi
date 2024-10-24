import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import { testError } from "./testErrorService";

router.get('/', (req: Request, res: Response) => {
  console.log("test error");
  res.status(200).send("<<test error>>");
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log("id for error test:", req.params.id);
  try {
      const result = testError(parseInt(req.params.id));
      res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
