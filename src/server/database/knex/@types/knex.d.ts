import { ICities } from "../../models";

declare module "knex/types/tables" {
  interface Tables{
   cities: ICities
  //  person: ICities 
  //  user: ICities 
  }
}
