describe("UserService", () => {
  it("should not create duplicate email", async () => {
    const repo = new FakeUserRepository()
    const service = new UserService(repo)

    await service.create({
      name: "Samuel",
      email: "test@email.com",
      password: "123456",
      role: "CLIENT"
    })

    await expect(
      service.create({
        name: "Samuel",
        email: "test@email.com",
        password: "123456",
        role: "CLIENT"
      })
    ).rejects.toThrow()
  })
})