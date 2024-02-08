import { Router } from "express";
import { CitiesController } from "./../controllers";

CitiesController.create;

const router = Router();

router.get("/", (_, res) => {
  return res.send("Call Successful!");
});

router.post("/cities", CitiesController.createValidation, CitiesController.create);

export { router };
