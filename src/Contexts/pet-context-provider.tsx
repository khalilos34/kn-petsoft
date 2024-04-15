"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";
type petContext = {
  pets: Pet[];
  selectedPetId: string | null;
};

export const petContext = createContext<petContext | null>(null);
const PetContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);
  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
      }}
    >
      {children}
    </petContext.Provider>
  );
};

export default PetContextProvider;
