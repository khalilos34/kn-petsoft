"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PetList = () => {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { SearchQuery } = useSearchContext();
  const filteredPet = pets.filter((pet) =>
    pet.name.toLowerCase().includes(SearchQuery.toLocaleLowerCase()),
  );
  return (
    <ul className="border-b border-black/[0.08]  bg-white">
      {filteredPet.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]",
              {
                " bg-[#eff1f2]": pet.id === selectedPetId,
              },
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
