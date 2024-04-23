"use client";
import { addNewPet, checkOutPet, updatePet } from "@/actions/actions";
import { PetInputs } from "@/lib/types";
import { Pet } from "@prisma/client";

import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";
type IPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleAddNewPet: (newPet: PetInputs) => Promise<void>;
  handleUpdatePet: (updatedPet: PetInputs, petId: Pet["id"]) => Promise<void>;
  handleCheckOut: (petId: Pet["id"]) => Promise<void>;
};

export const petContext = createContext<IPetContext | null>(null);
const PetContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "update":
          return state.map((pet) =>
            pet.id === payload.petId ? { ...pet, ...payload.updatedPet } : pet,
          );
        case "checkOut":
          return state.filter((pet) => pet.id !== payload.petId);
        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;
  const handleAddNewPet = async (newPet: PetInputs) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addNewPet(newPet);
    if (error) {
      toast.warning(error.message);
    }
  };
  const handleUpdatePet = async (updatedPet: PetInputs, petId: Pet["id"]) => {
    setOptimisticPets({ action: "edit", payload: { updatedPet, petId } });
    const error = await updatePet(petId, updatedPet);
    if (error) {
      toast.warning(error.message);
    }
  };
  const handleCheckOut = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "checkOut", payload: petId });

    const error = await checkOutPet(petId);
    if (error) {
      toast.warning(error.message);
    }
    setSelectedPetId(null);
  };
  return (
    <petContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numberOfPets,
        handleAddNewPet,
        handleUpdatePet,
        handleCheckOut,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
