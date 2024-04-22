"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { addNewPet, updatePet } from "@/actions/actions";
import PetButtonState from "./PetButtonState";
import { toast } from "sonner";

const PetForm = ({
  actionType,
  closeDialog,
}: {
  actionType: "add" | "edit";
  closeDialog: () => void;
}) => {
  const { selectedPet } = usePetContext();

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        if (actionType == "add") {
          const error = await addNewPet(formData);
          if (error) {
            toast.warning(error.message);
          }
        } else {
          const error = await updatePet(selectedPet!.id, formData);
          if (error) {
            toast.warning(error.message);
          }
        }
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
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">imageUrl</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetButtonState actionType={actionType} />
    </form>
  );
};

export default PetForm;
