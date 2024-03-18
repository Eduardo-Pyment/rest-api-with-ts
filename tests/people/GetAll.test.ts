import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetAll", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("./cities").send({ name: "test" });
    cityId = resCity.body;
  });

  test("Search for registers", async () => {
    const res1 = await testServer.post("./people").send({cityId, email: "johndoe@email.domain", fullName: "John Doe"});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer.get("./people").send();
    expect(Number(resSearched.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
