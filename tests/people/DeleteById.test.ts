import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - DeleteById", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("./cities").send({ name: "test" });
    cityId = resCity.body;
  });

  test("Deletes a register", async () => {
    const res1 = await testServer.post("./people").send({ cityId, email: "johndoe@email.domain", fullName: "John Doe" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`./people/${res1.body}`).send();
    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  test("Attempts to delete a non-existing register", async () => { 
    const res1 = await testServer.delete("./people/9999999").send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
