"use client";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { checkOutPet } from "@/actions/actions";

const CheckoutButton = ({ children }: { children: React.ReactNode }) => {
  const { selectedPet } = usePetContext();
  return (
    <form action={() => checkOutPet(selectedPet!.id)}>
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
