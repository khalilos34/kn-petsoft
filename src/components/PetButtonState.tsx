import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const PetButtonState = ({ actionType }: { actionType: "add" | "edit" }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-5 self-end rounded-full"
    >
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
};

export default PetButtonState;
