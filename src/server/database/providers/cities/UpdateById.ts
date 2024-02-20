import { ETableNames } from "../../ETableNames";
import { ICities } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (id: number, city: Omit<ICities, "id">): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city).update(city).where("id", "=", id);
    if (result > 0) return;

    return new Error("Error while updating register, verify if the id exists and try again");
  } catch (error) {
    console.log(error);
    return new Error("Error while updating register, verify if the id exists and try again");
  }
};
