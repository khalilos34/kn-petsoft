"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addNewPet = async (formData: FormData) => {
  await prisma.pet.create({
    data: {
      name: formData.get("name") as string,
      age: +(formData.get("age") as string),
      ownerName: formData.get("ownerName") as string,
      notes: formData.get("notes") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    },
  });
  revalidatePath("/app", "layout");
};
