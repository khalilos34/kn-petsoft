"use client";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  const routes = [
    {
      label: "Dashboard",
      path: "/app/dashboard",
    },
    {
      label: "Account",
      path: "/app/account",
    },
  ];
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.label}>
              <Link
                href={route.path}
                className={cn(
                  `rounded-sm  px-2 py-1 text-white/70 transition hover:text-white focus:text-white`,
                  {
                    "bg-black/10 text-white": pathname === route.path,
                  },
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
