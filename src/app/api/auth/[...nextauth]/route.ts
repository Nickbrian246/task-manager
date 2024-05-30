import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import prisma from "../../../../../prisma";
import { signJwt } from "../_utils/signAuth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash, verify } from "argon2";
import { AuthRegister } from "@/components/auth/login/interfaces/inputList";
import { UserSchema } from "@/validarions/auth/user";
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
        if (credentials) {
          const hashedPassword = await hash(credentials.password);

          const data = UserSchema.parse({
            ...credentials,
            password: hashedPassword,
          });

          const { id, email, name } = await prisma.user.create({
            data,
          });

          return { id, name, email };
        }

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
        if (email && password) {
          const user = await prisma.user.findFirst({
            where: { email },
          });
          if (user?.password) {
            const validatePassword = await verify(user.password, password);
            const token = await signJwt({ email, userId: user.id });
            if (validatePassword)
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                accessToken: token,
                toDos: user.ToDos,
              };
          }
        }

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
