import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto max-w-[1050px] px-4">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
