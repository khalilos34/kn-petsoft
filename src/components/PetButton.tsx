"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetForm from "./PetForm";
import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { flushSync } from "react-dom";
type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
};

const PetButton = ({ actionType, children }: PetButtonProps) => {
  const [isDialogOPen, setIsDialogOpen] = useState(false);
  if (actionType === "checkout") {
    return <CheckoutButton>{children}</CheckoutButton>;
  }
  return (
    <Dialog open={isDialogOPen} onOpenChange={setIsDialogOpen}>
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
          {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </DialogHeader>
        <PetForm
          actionType={actionType}
          closeDialog={() => {
            flushSync(() => setIsDialogOpen(false));
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
