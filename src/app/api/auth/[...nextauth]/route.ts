import { UserSchema } from "@/validarions/auth/user";
import { hash, verify } from "argon2";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../prisma";
import { signJwt } from "../_utils/signAuth";
import { SigninController } from "./_controllers/signin";
import { registerController } from "./_controllers/register";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "emami@email.com",
        },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        familyName: { label: "LastName", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await registerController(credentials);
        if (user) return user;
        return null;
      },
    }),
    CredentialsProvider({
      id: "sign-in",
      name: "sign-in",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials;
        if (!email && !password) return null;
        const user = await SigninController(email, password);
        if (user) return user;
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (profile) {
        try {
          await prisma.user.upsert({
            where: { email: profile?.email },
            update: {
              name: profile.name,
            },
            create: {
              email: profile?.email,
              familyName: profile?.family_name,
              name: profile?.given_name,
              origin: "GOOGLE",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session && token.email) {
        const user = await prisma.user.findFirst({
          where: { email: token.email },
        });

        const customToken = await signJwt({
          email: user?.email,
          userId: user?.id,
        });
        session.access_token = customToken;
        return session;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "http://localhost:3000/",
    signOut: "http://localhost:3000/",
  },
});

export { handler as GET, handler as POST };
