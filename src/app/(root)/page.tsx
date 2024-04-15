import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#5dc9a8] md:flex-row">
      <Image
        src={
          "https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        }
        alt="petSoft"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="my-6 max-w-[500px] text-5xl font-semibold">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="max-w-[600px] text-2xl font-medium">
          Use Petsoft to easily keep track of pets under your care. Get lifetime
          access for $199.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild className="h-10 rounded-full px-6">
            <Link href={"/app/dashboard"}>Get Started</Link>
          </Button>
          <Button
            asChild
            className="h-10 rounded-full px-6"
            variant={"secondary"}
          >
            <Link href={"/login"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
