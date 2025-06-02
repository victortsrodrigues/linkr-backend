import prismaClient from "../database/client";
import bcrypt from "bcrypt";

async function findByEmail(email: string) {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(username: string, email: string, password: string) {
  const saltRounds = 10;
  return await prismaClient.user.create({
    data: {
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    },
  });
}

const authRepository = {
  findByEmail,
  createUser,
};

export default authRepository;
