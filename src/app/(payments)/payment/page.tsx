"use client";
import { createCheckOutSession } from "@/actions/actions";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

const PaymentPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <Logo />
      <main className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-center text-2xl font-medium leading-6">
          PetSoft access requires payment
        </h1>
        {!searchParams.success && (
          <Button
            disabled={isPending}
            className="rounded-full"
            onClick={async () =>
              startTransition(async () => await createCheckOutSession())
            }
          >
            buy a lifetime access only for $299
          </Button>
        )}
        {searchParams.success && (
          <p className="mt-10 text-sm text-green-700">
            Payment successful! You now have lifetime access to PetSoft.
          </p>
        )}
        {searchParams.cancelled && (
          <p className="mt-10 text-sm text-red-700">
            Payment cancelled! You can try again.
          </p>
        )}
      </main>
    </div>
  );
};

export default PaymentPage;
