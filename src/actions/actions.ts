"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetFormSchema, PetInputs } from "@/lib/types";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

//--------------------user actions-------------------

export const logIn = async (formData: FormData) => {
  await signIn("credentials", formData);
};
export const signUp = async (formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  );
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });
  await signIn("credentials", formData);
};
export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

//------------------------pet actions --------------------

export const addNewPet = async (newPet: unknown) => {
  const validatedPet = PetFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return { message: "Invalid pet inputs" };
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not add the pet" };
  }
};

export const checkOutPet = async (id: Pet["id"]) => {
  try {
    await prisma.pet.delete({ where: { id } });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not delete the pet" };
  }
};

export const updatePet = async (petId: Pet["id"], updatedPet: PetInputs) => {
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
