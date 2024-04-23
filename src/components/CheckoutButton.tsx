"use client";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";

const CheckoutButton = ({ children }: { children: React.ReactNode }) => {
  const { selectedPet, handleCheckOut } = usePetContext();
  return (
    <form action={async () => await handleCheckOut(selectedPet!.id)}>
      <Button
        className="h-10 rounded-full px-6"
        type="submit"
        variant="secondary"
      >
        {children}
      </Button>
    </form>
  );
};

export default CheckoutButton;
