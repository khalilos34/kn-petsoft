"use client";

import { usePetContext } from "@/lib/hooks";

const CurrentGuests = () => {
  const { numberOfPets } = usePetContext();
  if (!numberOfPets) return "";
  return (
    <section className="text-center">
      <p className="text-2xl font-medium leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
};

export default CurrentGuests;
