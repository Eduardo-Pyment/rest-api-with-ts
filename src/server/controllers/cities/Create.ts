import { Request, Response } from "express";
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
  } catch (error) {
    const yupError = error as yup.ValidationError;
    return res.json({
      errors: {
        default: yupError.message,
      }
    });
  }


  console.log(validatedData);

  return res.send("Create!");
};
