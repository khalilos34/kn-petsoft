"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";

const PetDetails = () => {
  const { selectedPet } = usePetContext();
  if (!selectedPet)
    return (
      <div className="flex size-full items-center justify-center text-2xl font-semibold">
        <p>No pets selected</p>
      </div>
    );
  return (
    <section className="flex size-full flex-col ">
      <div className="flex items-center  border-b border-black/[0.08] bg-white px-8 py-5">
        <Image
          src={selectedPet?.imageUrl}
          alt=""
          width={75}
          height={75}
          className="h-[75px] w-[75px] rounded-full object-cover"
        />
        <h2 className="ml-5 text-3xl font-semibold leading-5">
          {selectedPet?.name}
        </h2>
      </div>
      <div className="flex justify-around px-5 py-10">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerName}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet.age}</p>
        </div>
      </div>
      <section className="mx-8 mb-9 flex-1 rounded-md border border-black/[0.08] bg-white  px-7 py-5">
        {selectedPet.notes}
      </section>
    </section>
  );
};

export default PetDetails;
