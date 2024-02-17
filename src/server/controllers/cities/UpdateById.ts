import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICities } from "../../database/models";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<ICities, "id" | "state"> {} // Specifies types for request body properties from database/models excluding the id and the state prop

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

// Controller (only executed after bodyValidation)
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found!"
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

