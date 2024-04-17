"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";
type IPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, Pet: Omit<Pet, "id">) => void;
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
  const handleAddPet = (newPet: Omit<Pet, "id">) =>
    setPets((prev) => [...prev, { ...newPet, id: Date.now().toString() }]);
  const handleEditPet = (petId: string, pet: Omit<Pet, "id">) => {
    setPets((prev) => {
      return prev.map((p) => {
        if (p.id === petId) {
          return {
            ...p,
            ...pet,
          };
        }
        return p;
      });
    });
  };
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
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
