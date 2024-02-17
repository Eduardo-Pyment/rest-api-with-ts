import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICities } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";

interface IBodyProps extends Omit<ICities, "id"> { } // Specifies types for request body properties from database/models excluding the id prop

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  })),
}));

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, ICities>, res: Response) => {
  const result = await CitiesProvider.create(req.body); // Attempts to create an entry at the database
  if (result instanceof Error) { 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }
  return res.status(StatusCodes.CREATED).json(result); // If validation pass, returns status and content
};
