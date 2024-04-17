"use client";
import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";

const PetForm = ({
  actionTyp,
  closeDialog,
}: {
  actionTyp: "add" | "edit";
  closeDialog: () => void;
}) => {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      age: +(formData.get("age") as string),
      ownerName: formData.get("ownerName") as string,
      notes: formData.get("notes") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    };
    if (actionTyp === "add") {
      handleAddPet(pet);
      closeDialog();
    } else {
      handleEditPet(selectedPet!.id, pet);
      closeDialog();
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={actionTyp === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            required
            defaultValue={actionTyp === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            defaultValue={actionTyp === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">imageUrl</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={actionTyp === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            required
            defaultValue={actionTyp === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end rounded-full">
        {actionTyp === "add" ? "Add a new pet" : "Edit pet"}
      </Button>
    </form>
  );
};

export default PetForm;
