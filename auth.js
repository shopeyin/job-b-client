import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          user = await login(credentials);

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      //
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }

      return token;
    },
    session({ session, token }) {
      //
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.token = token.token;
      return session;
    },
  },
});
