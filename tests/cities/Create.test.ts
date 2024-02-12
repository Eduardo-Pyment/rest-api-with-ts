import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

//describe(name, fn) : jest function that creates a block that groups together several related tests
describe("Cities - Create", () => {
  //test(name, fn) : jest function that creates a test case
  test("Creates a register", async () => {
    const response_1 = await testServer.post("/cities").send({ name: "Example City", state: "Example State"});

    expect(response_1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response_1.body).toEqual("number");
  });
  test("Attempts to create a too-short register name", async () => {
    const response_1 = await testServer.post("/cities").send({ name: "Ne", });

    expect(response_1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response_1.body).toHaveProperty("errors.body.name");
  });
});
