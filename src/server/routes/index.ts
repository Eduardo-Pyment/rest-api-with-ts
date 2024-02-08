import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

import { CitiesController } from "./../controllers";
CitiesController.create;

const router = Router();

router.get("/", (_, res) => {
  return res.send("Call Successful!");
});

router.post("/cities", CitiesController.createBodyValidator, CitiesController.createQueryValidator, CitiesController.create);

export { router };
