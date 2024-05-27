import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import prisma from "../../../../../prisma";
import { signJwt } from "../_utils/signAuth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
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
  },
});

export { handler as GET, handler as POST };
