import { UserService } from "../src/modules/user/user.service";
import { UserRepository } from "../src/modules/user/user.repository";
import { UserResponseDTO } from "../src/modules/user/user.dto";
import { AppError } from "../src/shared/errors/AppError";
import { UserRole } from "../src/modules/user/user.entity";

jest.mock("../src/modules/user/user.repository");
jest.mock("../src/modules/user/user.dto");

const mockedRepository = UserRepository as jest.Mocked<typeof UserRepository>;
const mockedDTO = UserResponseDTO as jest.Mocked<typeof UserResponseDTO>;

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: "1",
    name: "John",
    email: "john@email.com",
    role: UserRole.GERENTE,
    business_id: "business-1",
  } as any;

  const mockUserResponse = {
    id: "1",
    name: "John",
    email: "john@email.com",
  };

  // =========================
  // CREATE
  // =========================

  it("should create a user successfully", async () => {
    mockedRepository.exists.mockResolvedValue(false);
    mockedRepository.create.mockResolvedValue(mockUser);
    mockedDTO.fromEntity.mockReturnValue(mockUserResponse as any);

    const result = await UserService.create({
      name: "John",
      email: "john@email.com",
      password: "123456",
    } as any);

    expect(mockedRepository.exists).toHaveBeenCalledWith("john@email.com");
    expect(mockedRepository.create).toHaveBeenCalled();
    expect(result).toEqual(mockUserResponse);
  });

  it("should throw error if email already exists", async () => {
    mockedRepository.exists.mockResolvedValue(true);

    await expect(
      UserService.create({
        name: "John",
        email: "john@email.com",
        password: "123456",
      } as any)
    ).rejects.toThrow(AppError);
  });

  // =========================
  // FIND BY ID
  // =========================

  it("should return user by id", async () => {
    mockedRepository.findById.mockResolvedValue(mockUser);
    mockedDTO.fromEntity.mockReturnValue(mockUserResponse as any);

    const result = await UserService.findById("1");

    expect(result).toEqual(mockUserResponse);
  });

  it("should return null if user not found", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    const result = await UserService.findById("1");

    expect(result).toBeNull();
  });

  // =========================
  // UPDATE
  // =========================

  it("should update user successfully", async () => {
    mockedRepository.findById.mockResolvedValue(mockUser);
    mockedRepository.exists.mockResolvedValue(false);
    mockedRepository.update.mockResolvedValue(mockUser);
    mockedDTO.fromEntity.mockReturnValue(mockUserResponse as any);

    const result = await UserService.update("1", {
      name: "Updated",
      email: "new@email.com",
    } as any);

    expect(result).toEqual(mockUserResponse);
  });

  it("should throw error if updating non-existent user", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    await expect(
      UserService.update("1", { name: "Updated" } as any)
    ).rejects.toThrow(AppError);
  });

  it("should throw error if email already in use during update", async () => {
    mockedRepository.findById.mockResolvedValue(mockUser);
    mockedRepository.exists.mockResolvedValue(true);

    await expect(
      UserService.update("1", { email: "other@email.com" } as any)
    ).rejects.toThrow(AppError);
  });

  // =========================
  // DELETE
  // =========================

  it("should delete user successfully", async () => {
    mockedRepository.findById.mockResolvedValue(mockUser);
    mockedRepository.delete.mockResolvedValue(false);

    await UserService.delete("1");

    expect(mockedRepository.delete).toHaveBeenCalledWith("1");
  });

  it("should throw error when deleting non-existent user", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    await expect(UserService.delete("1")).rejects.toThrow(AppError);
  });

  // =========================
  // CREATE BARBER
  // =========================

  it("should create barber if manager is valid", async () => {
    mockedRepository.findById.mockResolvedValue(mockUser);
    mockedRepository.exists.mockResolvedValue(false);
    mockedRepository.create.mockResolvedValue({
      ...mockUser,
      role: UserRole.FUNCIONARIO,
    });
    mockedDTO.fromEntity.mockReturnValue(mockUserResponse as any);

    const result = await UserService.createBarber(
      {
        name: "Barber",
        email: "barber@email.com",
        password: "123",
      } as any,
      "1"
    );

    expect(result).toEqual(mockUserResponse);
  });

  it("should throw error if manager not found", async () => {
    mockedRepository.findById.mockResolvedValue(null);

    await expect(
      UserService.createBarber({} as any, "1")
    ).rejects.toThrow(AppError);
  });

  it("should throw error if user is not manager", async () => {
    mockedRepository.findById.mockResolvedValue({
      ...mockUser,
      role: UserRole.FUNCIONARIO,
    });

    await expect(
      UserService.createBarber({} as any, "1")
    ).rejects.toThrow(AppError);
  });
});