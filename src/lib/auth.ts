import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
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
      if (isTryingToAccessApp && isLoggedIn) {
        return true;
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isTryingToAccessApp && !isLoggedIn) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
export const { auth, signIn, signOut } = NextAuth(config);
