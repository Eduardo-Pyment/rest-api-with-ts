import { ETableNames } from "../../ETableNames";
import { ICities } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<ICities | Error> => {
  try {
    const result = await Knex(ETableNames.city).select("*").where("id", "=", id).first();
    if (result) return result;

    return new Error("Register not found");
  } catch (error) {
    console.log(error);
    return new Error("Error while consulting register");
  }
};
