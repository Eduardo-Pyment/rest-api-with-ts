import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - UpdateById", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("./cities").send({ name: "test" });
    cityId = resCity.body;
  });

  test("Updates a register by Id", async () => {
    const res1 = await testServer.post("./people").send({ cityId, email: "johndoe@email.domain", fullName: "John Doe" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer.post(`./people/${res1.body}`).send({ cityId, email: "john@email.domain", fullName: "Doe" });
    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);    
  });
  test("Attempts to update a non-existing register", async () => {
    const res1 = await testServer.post("./people/9999999").send({ cityId, email: "johndoe@email.domain", fullName: "John Doe" });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
