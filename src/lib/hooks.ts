import { petContext } from "@/Contexts/pet-context-provider";
import { useContext } from "react";

export const usePetContext = () => {
  const context = useContext(petContext);
  if (!context) {
    throw new Error("useContext must be used within a PetContextProvider");
  }
  return context;
};
