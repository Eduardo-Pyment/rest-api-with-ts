import { ETableNames } from "../ETableNames";
import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.city, table => {
    table.bigIncrements("id").primary().index();
    table.string("name", 150).checkLength("<=", 150).index().notNullable();
    table.string("state", 150).checkLength("<=", 150).index();
    table.comment("Table used to store cities");
  }).then(() => { 
    console.log(`# Create table ${ETableNames.city}`);
  });

}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`# Dropped table ${ETableNames.city}`);    
  });
}
