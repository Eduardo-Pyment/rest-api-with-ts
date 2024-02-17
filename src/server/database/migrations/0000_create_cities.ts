import { ETableNames } from "../ETableNames";
import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.cities, table => {
    table.bigIncrements("id").primary().index();
    table.string("name", 150).notNullable();
    table.comment("Table used to store cities");
  }).then(() => { 
    console.log(`# Create table ${ETableNames.cities}`);
  });

}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cities);
}
