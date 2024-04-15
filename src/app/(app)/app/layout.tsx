import PetContextProvider from "@/Contexts/pet-context-provider";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Pet } from "@/lib/types";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  );
  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }
  const data: Pet[] = await response.json();
  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
