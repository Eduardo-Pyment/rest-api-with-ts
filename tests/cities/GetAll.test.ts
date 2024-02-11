import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

//describe(name, fn) : jest function that creates a block that groups together several related tests
describe("Cities - Create", () => {
  //test(name, fn) : jest function that creates a test case
  test("Creates a register then GET all entries", async () => {
    const reg_1 = await testServer.post("/cities").send({ name: "Example City 1", state: "Example State 1" });
    expect(reg_1.statusCode).toEqual(StatusCodes.CREATED);

    const res = await testServer.get("/cities").send();
    expect(Number(res.header["x-total-count"])).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
