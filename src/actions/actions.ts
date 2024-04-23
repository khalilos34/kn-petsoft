"use server";

import prisma from "@/lib/db";
import { PetInputs } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addNewPet = async (newPet: PetInputs) => {
  try {
    await prisma.pet.create({
      data: newPet,
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
