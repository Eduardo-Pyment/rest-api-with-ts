import supertest from "supertest";
import { server } from "../src/server/server";
import { Knex } from "../src/server/database/knex";

// beforeAll runs a function before any of the tests in this file run.
beforeAll(async () => {
  await Knex.migrate.latest();// Migrates the knex instance to :memory:
});

// afterAll runs a function after all the tests in this file have completed
afterAll(async () => {
  await Knex.destroy();// Closes the knex instance after the tests have been completed
});

export const testServer = supertest(server);
