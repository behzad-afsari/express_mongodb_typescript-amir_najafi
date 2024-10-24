import express, { NextFunction, Request, response, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logrequest } from "./middlewares";
import { userControllesrs } from "./users";
import { productControllers } from "./products";
import { authControllers } from "./auth";
import logger from './utils/logger'
import {ErrorHandelingMiddleware} from "./middlewares";
import testError from './test-error/testErrorController'

const app = express();

app.use(cors());
app.use(express.json());

app.use(logrequest);


//Home page
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1> Home Page </h1>");
});

// Routes
app.use("/users", userControllesrs);
app.use("/test-error", testError);
app.use("/products", productControllers);
app.use("/auth", authControllers);

app.use(ErrorHandelingMiddleware)

404
app.get("*", (req: Request, res: Response) => {
  res.status(404).send("<h1> 404 . Page not Found. </h1>");
});

const DBURI = "mongodb://localhost:27017/amir-najafi";
mongoose
  .connect(DBURI,{})
  .then(()=>{
      app.listen(3000, () => {
        // console.log("app listen on port 3000");
        logger.info("app listen on port 3000");
        // logger.warn('the server warning')
      } )
  })
  .catch((err) => {
    // console.log("Error :", err);
    logger.error("Error :", err);
  });