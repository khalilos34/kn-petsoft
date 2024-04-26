"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const AuthFormButton = ({ type }: { type: "logIn" | "signUp" }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="rounded-full">
      {type}
    </Button>
  );
};

export default AuthFormButton;
