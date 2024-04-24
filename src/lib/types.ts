import { Pet } from "@prisma/client";
import { z } from "zod";

export type PetInputs = Omit<Pet, "id" | "createdAr" | "updatedAt">;

export const PetFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Pet name should be at least 3 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(3, { message: "Owner name should be at least 3 characters" }),
  age: z.coerce.number().int().max(20),
  imageUrl: z.union([z.literal(""), z.string().trim().url("")]),
  notes: z.union([
    z.literal(""),
    z.string().min(3, { message: "name should be at least 3 characters" }),
  ]),
});
export type TPetForm = z.infer<typeof PetFormSchema>;
