import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { User } from "@prisma/client";
import prisma from "./db";

export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
};

export const getPetsByUserId = async (userId: User["id"]) => {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
};
