import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

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
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Entry not found"
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};

