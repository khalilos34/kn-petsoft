"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addNewPet = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    age: +(formData.get("age") as string),
    ownerName: formData.get("ownerName") as string,
    notes: formData.get("notes") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  };

  await prisma.pet.create({
    data,
  });

  revalidatePath("/app", "layout");
};
export const checkOutPet = async (id: string) => {
  await prisma.pet.delete({ where: { id } });
  revalidatePath("/app", "layout");
};

export const updatePet = async (petId: string, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    age: +(formData.get("age") as string),
    ownerName: formData.get("ownerName") as string,
    notes: formData.get("notes") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  };
  await prisma.pet.update({
    where: { id: petId },
    data,
  });
  revalidatePath("/app", "layout");

  try {
  } catch (error) {
    console.log(error);
  }
};
