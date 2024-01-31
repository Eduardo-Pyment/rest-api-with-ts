import { Request, Response } from "express";

interface ICities {
  name: string;
}

export const create = (req: Request<{}, {}, ICities>, res: Response) => {

  if (req.body.name === undefined || req.body.name === null || req.body.name === "") {
    return res.status(400).send("Name is required!");
  }

  console.log(req.body);

  return res.send("Create!");
};
