'use client'
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";


const PetList = () => {
  const {pets,selectedPetId}=usePetContext()
  return (
    <ul className="border-b border-black/[0.08]  bg-white">
      {pets.map((pet: any) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]">
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
