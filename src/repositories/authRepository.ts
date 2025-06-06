import prismaClient from "../database/client";
import bcrypt from "bcrypt";

async function findByEmail(email: string) {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(username: string, email: string, password: string, image: string) {
  const saltRounds = 10;
  return await prismaClient.user.create({
    data: {
      username,
      email,
      image,
      password: bcrypt.hashSync(password, saltRounds),
    },
  });
}

async function findById(userId: number) {
  return await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function getUsersSuggestions(userId: number) {
  return await prismaClient.user.findMany({
    where:{
      NOT: {
        id: userId,
      }
    },
    omit:{
      password: true,
      email: true
    }
  })
}

const authRepository = {
  findByEmail,
  createUser,
  findById,
  getUsersSuggestions,
};

export default authRepository;
