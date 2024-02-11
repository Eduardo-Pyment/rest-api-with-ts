import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

//describe(name, fn) : jest function that creates a block that groups together several related tests
describe("Cities - GetByID", () => {
  //test(name, fn) : jest function that creates a test case
  test("Search register by Id", async () => {
    const reg_1 = await testServer.post("/cities").send({ name: "Example City 1", state: "Example State 1" });
    expect(reg_1.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get(`/cities/${reg_1.body}`).send();
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("name");
  });
  test("Attempts to search a non existing Id", async () => {

    const reg_1 = await testServer.get("/cities/99999").send();
    expect(reg_1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(reg_1.body).toHaveProperty("errors.default");
  });
});
