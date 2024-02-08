import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

interface TValidation {
  (schema: Schema<any>): RequestHandler;
}

export const validation: TValidation = (schema: Schema<any>) => async (req, res, next) => {
  console.log("test");

  try {
    await schema.validate(req.query, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as ValidationError;
    const validationErrors: Record<string, string> = {};//

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
  }
};
