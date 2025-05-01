import prisma from "../../../shared/prisma";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User, UserStatus } from "@prisma/client";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      profileImage: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      profileImage: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  return result;
};

const updateUserIntoDB = async (id: string, data: Partial<User>) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      profileImage: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
    },
    data,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const changeUserStatus = async (id: string, status: UserStatus) => {

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status
    },
  });
  return result;
};

export const UserService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  changeUserStatus,
};
