import { ETableNames } from "../../ETableNames";
import { IPerson } from "../../models";
import { Knex } from "../../knex";

export const create = async (person: Omit<IPerson, "id">): Promise<Number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.person)
      .where("id", "=", person.cityId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) return new Error("City used on sign in was not found");

    const [result] = await Knex(ETableNames.person).insert(person).returning("id");

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

