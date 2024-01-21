// users.test.ts

import UserService from "../Users";
import { prisma } from "@/prisma/db";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

// Mock de prisma
jest.mock("@/prisma/db", () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock de bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
      role: Role.USER,
      avatar: "https://www.google.com",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.create(mockUser);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUser.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { ...mockUser, password: "hashedPassword" },
    });
    expect(result).toEqual(mockUser);
  });

  it("should update a user", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
      role: Role.USER,
      avatar: "https://www.google.com",
    };

    (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.update(mockUser.id, mockUser);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: mockUser,
    });
    expect(result).toEqual(mockUser);
  });

  it("should update a user's password", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
      role: Role.USER,
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.updatePassword(mockUser.id, "newPassword");

    expect(bcrypt.hash).toHaveBeenCalledWith("newPassword", 10);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: { password: "hashedPassword" },
    });
    expect(result).toEqual(mockUser);
  });

  it("should delete a user", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
      role: "USER",
    };

    (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.delete(mockUser.id);

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });
    expect(result).toEqual(mockUser);
  });

  it("should sign in a user", async () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
      role: "USER",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await UserService.signin(mockUser.email, mockUser.password);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUser.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockUser.password,
      mockUser.password
    );
    expect(result).toEqual(mockUser);
  });
});
