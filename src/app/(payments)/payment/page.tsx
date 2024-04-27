import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <Logo />
      <main className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-center text-2xl font-medium leading-6">
          PetSoft access requires payment
        </h1>
        <Button className="rounded-full">
          buy a lifetime access only for $299
        </Button>
      </main>
    </div>
  );
};

export default PaymentPage;
