"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { addNewPet } from "@/actions/actions";

const PetForm = ({
  actionTyp,
  closeDialog,
}: {
  actionTyp: "add" | "edit";
  closeDialog: () => void;
}) => {
  const { selectedPet } = usePetContext();

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        await addNewPet(formData);
        closeDialog();
      }}
    >
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
