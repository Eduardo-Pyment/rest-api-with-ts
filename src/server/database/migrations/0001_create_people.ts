import { ETableNames } from "../ETableNames";
import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.person, table => {
    table.bigIncrements("id").primary().index();
    table.string("fullName").index().notNullable();
    table.string("email").unique().index().notNullable();
    table.string("cityId").index().notNullable().references("id").inTable(ETableNames.city).onUpdate("CASCADE").onDelete("RESTRICT");
    table.comment("Table used to store 'people' data");
  }).then(() => {
    console.log(`# Create table ${ETableNames.person}`);
  });

}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`# Dropped table ${ETableNames.person}`);
  });
}

