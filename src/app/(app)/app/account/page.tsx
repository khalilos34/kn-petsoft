import ContentBlock from "@/components/ContentBlock";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <h1 className="my-8 text-2xl font-medium  leading-6 text-white">
        Your Account
      </h1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as {session.user.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
