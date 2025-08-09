import CredentialsProvider from "next-auth/providers/credentials";
import { collection, getCollection } from "./getCollection";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("credentials", credentials);
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();
          return user;
        } catch (err) {
          console.error("❌ Authorize error:", err.message);
          return null;
        }
      },
    }),
  
  ],
  session: {
    strategy: "jwt", // use JWT tokens for stateless auth
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const users = await getCollection(collection.user_collection);
        const existingUser = await users.findOne({ email: user.email });
        if (!existingUser) {
          await users.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            createdAt: new Date(),
          });
        }
        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
        },
      };
    },
  },
};