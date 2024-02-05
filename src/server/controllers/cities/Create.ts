import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICities {
  name: string;
  state: string;
}

const bodyValidation: yup.Schema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(2),
});

// express middleware
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const validationErrors: Record<string, string> = {};//

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
  }
};

// controller (only executed after bodyValidation)
export const create: RequestHandler = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);  

  return res.send("Create!");
};
