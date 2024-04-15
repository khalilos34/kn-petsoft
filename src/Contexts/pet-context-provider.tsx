"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";
type IPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
};

export const petContext = createContext<IPetContext | null>(null);
const PetContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const handleChangeSelectedPetId = (id: string) => setSelectedPetId(id);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;
  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
