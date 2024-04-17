import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetForm from "./PetForm";
type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
};

const PetButton = ({ actionType, children }: PetButtonProps) => {
  if (actionType === "checkout") {
    return (
      <Button className="h-10 rounded-full px-6" variant="secondary">
        {children}
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon" className="rounded-full">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button className="h-10 rounded-full px-6" variant="secondary">
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {actionType === "add" ? "Add new pet" : "Edit pet"}
        </DialogHeader>
        <PetForm />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
