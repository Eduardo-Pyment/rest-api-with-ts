import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

interface ICities {
  name: string;
  state: string;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().required().min(3)
  }))
}));

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.send("Create!");
};
