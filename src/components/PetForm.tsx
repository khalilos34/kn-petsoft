"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetButtonState from "./PetButtonState";
import { useForm } from "react-hook-form";
import { PetFormSchema, TPetForm } from "@/lib/types";
import { PET_IMAGE_PLACEHOLDER } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";

const PetForm = ({
  actionType,
  closeDialog,
}: {
  actionType: "add" | "edit";
  closeDialog: () => void;
}) => {
  const { selectedPet, handleAddNewPet, handleUpdatePet } = usePetContext();
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<TPetForm>({
    resolver: zodResolver(PetFormSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      imageUrl: selectedPet?.imageUrl,
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    },
  });

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger();
        if (!result) return;
        const petData = getValues();
        petData.imageUrl = petData.imageUrl || PET_IMAGE_PLACEHOLDER;

        closeDialog();

        if (actionType == "add") {
          await handleAddNewPet(petData);
        } else {
          await handleUpdatePet(petData, selectedPet!.id);
        }
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">imageUrl</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetButtonState actionType={actionType} />
    </form>
  );
};

export default PetForm;
