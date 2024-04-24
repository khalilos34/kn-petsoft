import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main>
      <h1 className="mb-5 text-center text-2xl font-medium leading-6">Login</h1>
      <AuthForm />
      <p className=" mt-6 text-sm text-zinc-500 ">
        No account yet ?{" "}
        <Link href={"/signup"} className="font-medium underline">
          signup
        </Link>
        .
      </p>
    </main>
  );
};

export default LoginPage;
