import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

//describe(name, fn) : jest function that creates a block that groups together several related tests
describe("Cities - UpdateById", () => {
  //test(name, fn) : jest function that creates a test case
  test("Updates register", async () => {
    const response_1 = await testServer.post("/cities").send({ name: "Example City", state: "Example State"});
    expect(response_1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer.put(`/cities/${response_1.body}`).send({ name: "Example" });
    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  test("Attempts to update a non existing register", async () => {
    const res1 = await testServer.put("/cities/99999").send({
      name: "Example City Update"
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
