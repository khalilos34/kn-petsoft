import { logIn, signUp } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AuthForm = ({ type }: { type: "Signup" | "Login" }) => {
  return (
    <form action={type === "Login" ? logIn : signUp}>
      <div className="space-y-1 ">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="mb-4 mt-2 space-y-1 ">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <Button className="rounded-full">{type}</Button>
    </form>
  );
};

export default AuthForm;
