import { Button } from "./ui/button";

const PetButtonState = ({ actionType }: { actionType: "add" | "edit" }) => {
  return (
    <Button
      type="submit"
      className="mt-5 self-end rounded-full"
    >
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
};

export default PetButtonState;
