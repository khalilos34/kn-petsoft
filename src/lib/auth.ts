import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { authSchema } from "./types";

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = authSchema.safeParse(credentials);
        if (!validatedCredentials.success) {
          return null;
        }
        const { email, password } = validatedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          console.log("user not found");
          return null;
        }
        const isPasswordMatched = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!isPasswordMatched) {
          console.log("Invalid password");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (isTryingToAccessApp && !isLoggedIn) {
        return false;
      }
      if (isTryingToAccessApp && isLoggedIn && !auth.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }
      if (isTryingToAccessApp && isLoggedIn && auth.user.hasAccess) {
        return true;
      }
      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          (request.nextUrl.pathname.includes("/signup") && !auth.user.hasAccess)
        )
          return Response.redirect(new URL("/payment", request.nextUrl));
        else return true;
      }
      if (!isTryingToAccessApp && !isLoggedIn) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }
      if (trigger === "update") {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (user) {
          token.hasAccess = user.hasAccess;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
