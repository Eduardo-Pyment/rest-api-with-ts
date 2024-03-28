import { PeopleProvider } from "../../database/providers/people";
import { Request, RequestHandler, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IPerson } from "../../database/models";
import * as yup from "yup";

interface IBodyProps extends Omit<IPerson, "id"> { } // Specifies types for request body properties from database/models excluding the id prop

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cityId: yup.number().integer().required(),
    fullName: yup.string().required().min(3)
  })),
}));

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, IPerson>, res: Response) => {
  const result = await PeopleProvider.create(req.body); // Attempts to create an entry at the database
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: result.message } });
  }
  return res.status(StatusCodes.CREATED).json(result); // If validation pass, returns status and content
};
