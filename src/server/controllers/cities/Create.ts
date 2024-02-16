import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICities } from "../../database/models";

interface IBodyProps extends Omit<ICities, "id"> {} // Specifies types for request body properties from database/models excluding the id prop

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  })),
}));

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
