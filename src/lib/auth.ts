import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import type { DefaultSession, AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/db";
import { users } from "@/db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const config: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user?.hashedPassword) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || "",
          role: user.isAdmin ? "admin" : "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback - url:", url, "baseUrl:", baseUrl);

      // Sempre redireciona para /admin após login bem-sucedido
      if (url.includes("callbackUrl")) {
        return `${baseUrl}/admin`;
      }

      // Se a URL for relativa, redireciona para /admin
      if (url.startsWith("/")) {
        return `${baseUrl}/admin`;
      }

      // Se a URL for externa, permite
      if (url.startsWith(baseUrl)) {
        return url;
      }

      return `${baseUrl}/admin`;
    },
  },
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
