import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CitiesProvider } from "../../database/providers/cities";

interface IQueryProps {
  id?: number
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  body: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().default(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional()
  })),
}));

// Controller (only executed after bodyValidation)
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await CitiesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "", Number(req.query.id));
  const count = await CitiesProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);
  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: "Example Cities",
    }
  ]);
};

