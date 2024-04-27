import { User } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    hasAccess: boolean;
  }
}
declare module "next-auth" {
  interface User {
    hasAccess: boolean;
  }
  interface Session {
    user: User & { id: string; hasAccess: boolean };
  }
}
