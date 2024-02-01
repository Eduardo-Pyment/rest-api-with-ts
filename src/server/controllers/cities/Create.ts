import { Request, Response } from "express";
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

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  let validatedData: ICities | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const validationErrors: Record<string, string> = {};//

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
  }

  console.log(validatedData);

  return res.send("Create!");
};
