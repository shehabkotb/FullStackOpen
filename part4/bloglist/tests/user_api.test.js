const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper.js")
const User = require("../models/user")

const api = supertest(app)

describe("user rest api", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const rootUser = new User({
      username: "admin",
      name: "fortesting",
      password: "sekret"
    })
    await rootUser.save()
  })

  test("creating A user works", async () => {
    const user = {
      username: "newuser",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()

    expect(dbAtEnd).toHaveLength(2)
    const users = dbAtEnd.map((user) => user.username)
    expect(users).toContain("newuser")
  })

  test("get all users", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("content-type", /application\/json/)

    const users = await result.body.map((user) => user.username)
    expect(users).toContain("admin")
  })

  test("rejected user with short password", async () => {
    const testUser = {
      username: "new",
      name: "testUser",
      password: "se"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    expect(result.body.error).toEqual(
      "password should be at least 3 characters long"
    )
    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })

  test("rejected user with short username", async () => {
    const testUser = {
      username: "ne",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })

  test("rejected user with duplicate username", async () => {
    const testUser = {
      username: "admin",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
