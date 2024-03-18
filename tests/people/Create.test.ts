import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - GetById", () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post("./cities").send({ name: "test" });
    cityId = resCity.body;
  });
  test("Creates a register", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        email: "johndoe@email.domain",
        fullName: "John Doe",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Creates register 2", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        fullName: "Jane Doe",
        email: "janedoe@email.domain",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Attempts to create a duplicate register", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        fullName: "Jane Doe",
        email: "janedoe@email.domain",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer
      .post("/people")
      .send({
        cityId,
        email: "Jane Doe",
        fullName: "janedoe@email.domain",
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Attempts to create a too short fullName entry", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        email: "johndoe@email.domain",
        fullName: "J",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
  it("Attempts to create a register without fullName", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        email: "johndoe@email.domain",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
  it("Attempts to create a register without email", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        fullName: "John Doe",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Attempts to create a register with an invalid email", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        cityId,
        email: "John email.domain",
        fullName: "John Doe",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Attempts to create a register without a city", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        email: "johndoe@email.domain",
        fullName: "John Doe",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.city");
  });
  it("Attempts to create a register with an invalid city", async () => {
    const res1 = await testServer
      .post("/people")
      .send({
        city: "test",
        email: "johndoe@email.domain",
        fullName: "John Doe",
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.city");
  });
  it("Attempt to create an empty register", async () => {

    const res1 = await testServer
      .post("/people")
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.city");
    expect(res1.body).toHaveProperty("errors.body.fullName");
  });
});


