import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        return credentials;
      },
    }),
  ],
  callbacks: {
    // async jwt(token, user) {
    //   if (user) {
    //     token.accessToken = user.accessToken;
    //   }
    //   return token;
    // },
    // async session(session, token) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
