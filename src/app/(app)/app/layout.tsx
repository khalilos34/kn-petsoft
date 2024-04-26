import PetContextProvider from "@/Contexts/pet-context-provider";
import SearchContextProvider from "@/Contexts/search-context-provider";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const data = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });
  if (!data) {
    throw new Error("Could not fetch pets");
  }

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}
