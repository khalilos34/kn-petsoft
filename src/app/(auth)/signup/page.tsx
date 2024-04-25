import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main>
      <h1 className="mb-5 text-center text-2xl font-medium leading-6">
        Signup
      </h1>
      <AuthForm type="Signup" />
      <p className=" mt-6 text-sm text-zinc-500 ">
        Already have an account ?{" "}
        <Link href={"/login"} className="font-medium underline">
          Login
        </Link>
        .
      </p>
    </main>
  );
};

export default SignupPage;
