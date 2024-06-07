import { Profile } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../prisma";
import { registerController } from "./_controllers/register";
import { SigninController } from "./_controllers/signin";
interface CustomProfile extends Profile {
  family_name: string;
  given_name: string;
  email: string;
}
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
      async authorize(credentials) {
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
    async signIn({ profile, account, user, credentials, email }) {
      const customProfile = profile as CustomProfile;
      if (customProfile) {
        try {
          await prisma.user.upsert({
            where: { email: profile?.email },
            update: {
              name: customProfile.name,
            },
            create: {
              email: customProfile.email,
              familyName: customProfile.family_name,
              name: customProfile.given_name,
              origin: "GOOGLE",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
