import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

interface ICities {
  name: string;
  state: string;
}

const bodyValidation: yup.Schema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(2),
});

interface IFilter {
  filter?: string;
}

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3)
});

export const createValidation = validation(queryValidation);
export const createBodyValidation = validation(bodyValidation);

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.send("Create!");
};
