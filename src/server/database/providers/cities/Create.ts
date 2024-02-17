import { ICities } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const create = async (city: Omit<ICities, "id" | "state">): Promise<Number | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).insert(city).returning("id");

    if (typeof result === "object") {
      return result.id;

    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Error on register");
  } catch (error) {
    console.log(error);
    return new Error("Error on register");

  }
};
