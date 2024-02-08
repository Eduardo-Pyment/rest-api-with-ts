// import { RequestHandler } from "express";
// import { StatusCodes } from "http-status-codes";

// interface TValidation {
//   (): RequestHandler;
// }

// export const validation: TValidation = () => async (req, res, next) => {
//   console.log("test");

//   try {
//     await queryValidation.validate(req.body, { abortEarly: false });
//     return next();
//   } catch (err) {
//     const yupError = err as yup.ValidationError;
//     const validationErrors: Record<string, string> = {};//

//     yupError.inner.forEach(error => {
//       if (error.path === undefined) return;
//       validationErrors[error.path] = error.message;
//     });

//     return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
//   }
// };
