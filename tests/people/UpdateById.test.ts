import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("./cities").send({ name: "test" });
    cityId = resCity.body;
  });

  test("Gets a register by Id", async () => {
    const res1 = await testServer.post("./people").send({ cityId, email: "johndoe@email.domain", fullName: "John Doe" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGet = await testServer.get(`./people/${res1.body}`).send();
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body).toHaveProperty("fullName");
  });
  test("Attempts to get a non-existing register", async () => {
    const res1 = await testServer.get("./people/9999999").send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});

