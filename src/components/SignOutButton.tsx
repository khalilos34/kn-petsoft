"use client";
import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <Button className="rounded-full" onClick={async () => logOut()}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
