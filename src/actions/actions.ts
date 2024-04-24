"use server";

import prisma from "@/lib/db";
import { PetFormSchema, PetInputs } from "@/lib/types";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addNewPet = async (newPet: PetInputs) => {
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
