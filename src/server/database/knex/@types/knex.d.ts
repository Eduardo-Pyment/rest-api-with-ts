import { ICities, IPerson } from "../../models";

declare module "knex/types/tables" {
  interface Tables{
   city: ICities
   person: IPerson 
  //  user: ICities 
  }
}
