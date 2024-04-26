"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetFormSchema, PetInputs, authSchema } from "@/lib/types";
import { Pet, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/server-utils";
import { AuthError } from "next-auth";

//--------------------user actions-------------------

export const logIn = async (prevState: unknown, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const validatedAuth = authSchema.safeParse(data);
  if (!validatedAuth.success) {
    return { message: "Invalid auth inputs" };
  }
  try {
    await signIn("credentials", validatedAuth.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
};
export const signUp = async (prevState: unknown, formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  );
  try {
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email already exists" };
      }
    }
    return { message: "could not create the user" };
  }
  await signIn("credentials", formData);
};
export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

//------------------------pet actions --------------------

export const addNewPet = async (newPet: unknown) => {
  const session = await checkAuth();
  const validatedPet = PetFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return { message: "Invalid pet inputs" };
  }
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: { connect: { id: session.user?.id } },
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    console.log(error);
    return { message: "could not add the pet" };
  }
};

export const checkOutPet = async (id: Pet["id"]) => {
  const session = await checkAuth();
  const pet = await prisma.pet.findUnique({
    where: { id },
  });
  if (!pet) {
    return { message: "Pet not found" };
  }
  if (pet.userId !== session.user?.id) return { message: "Not authorized" };
  try {
    await prisma.pet.delete({ where: { id } });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not delete the pet" };
  }
};

export const updatePet = async (petId: Pet["id"], updatedPet: PetInputs) => {
  const session = await checkAuth();
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });
  if (!pet) {
    return { message: "Pet not found" };
  }
  if (pet.userId !== session.user?.id) return { message: "Not authorized" };

  try {
    await prisma.pet.update({
      where: { id: petId },
      data: updatedPet,
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not update the pet" };
  }
};
