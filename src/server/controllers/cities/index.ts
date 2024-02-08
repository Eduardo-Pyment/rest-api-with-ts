import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as create from "./Create";

export const CitiesController = {
  ...updateById,
  ...deleteById,
  ...getById,
  ...getAll,
  ...create,
};

