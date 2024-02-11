import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// describe(name, fn) : jest function that creates a block that groups together several related tests
describe("Cities - Delete by Id", () => {
  // test(name, fn) : jest function that creates a test case
  test("Deletes a register by Id", async () => {
    // Creates a register
    const createRegister = await testServer.post("/cities").send({name: "Example City", state: "Example State"});
    expect(createRegister.statusCode).toEqual(StatusCodes.CREATED);
    // Deletes created register
    const deleteRequest = await testServer.delete(`/cities/${createRegister.body}`).send();
    expect(deleteRequest.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  test("Attempts to delete a non existing Id", async () => {
    const deleteRequest = await testServer.delete("/cities/99999").send();

    expect(deleteRequest.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(deleteRequest.body).toHaveProperty("errors.default");
  });
});
