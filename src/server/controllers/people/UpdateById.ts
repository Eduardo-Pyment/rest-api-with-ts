import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IPerson } from "../../database/models";
import { PeopleProvider } from "../../database/providers/people";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPerson, "id"> { } // Specifies types for request body properties from database/models excluding the id and the state prop

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cityId: yup.number().required(),
    fullName: yup.string().required().min(3)
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

// Controller (only executed after bodyValidation)
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Id is required"
      }
    });
  }

  const result = await PeopleProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};

