import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  createUserSelect,
  userRepository,
} from "@/features/user/user.repository";
import { signInSchema } from "./zod/auth";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { ype: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const { email, password } = await signInSchema.parseAsync(credentials);

        const selectData = createUserSelect({
          id: true,
          name: true,
          email: true,
          password: true,
        });

        const userRepo = userRepository();

        const userDb = await userRepo.findUserByEmail(email, selectData);

        if (!userDb) {
          return null;
        }

        const isPwValid = await bcrypt.compare(password, userDb.password);

        if (!isPwValid) return null;

        return userDb;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, account }) => {
      if (user && account) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ token, session }) => {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}
