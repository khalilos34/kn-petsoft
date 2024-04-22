"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const addNewPet = async (formData: FormData) => {
  try {
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
  } catch (error) {
    return { message: "could not add the pet" };
  }
};
export const checkOutPet = async (id: string) => {
  await sleep(4000);
  try {
    await prisma.pet.delete({ where: { id } });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not delete the pet" };
  }
};

export const updatePet = async (petId: string, formData: FormData) => {
  try {
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
  } catch (error) {
    return { message: "could not update the pet" };
  }
};
