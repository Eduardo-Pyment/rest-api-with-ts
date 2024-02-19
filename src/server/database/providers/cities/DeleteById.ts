import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city).where("id", "=", id).del();
    if (result > 0) return; // Success on deletion
    return new Error("Error while deleting register");
  } catch (error) {
    console.log(error);
    return new Error("Error while deleting register");
  }
};
