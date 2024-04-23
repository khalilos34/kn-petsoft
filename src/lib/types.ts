import { Pet } from "@prisma/client";

export type PetInputs = Omit<Pet, "id" | "createdAr" | "updatedAt">;
