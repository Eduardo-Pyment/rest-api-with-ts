import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { PeopleProvider } from "../../database/providers/people";

interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

// Controller (only executed after bodyValidation)
export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  // Checks if there is id is undefined
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Id is required"
      }
    });
  }
  const result = await PeopleProvider.deleteById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

