// import CredentialsProvider from "next-auth/providers/credentials";
// import { collection, getCollection } from "./getCollection";
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           console.log("credentials", credentials);
//           const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//           });

//           if (!res.ok) {
//             throw new Error("Invalid credentials");
//           }

//           const user = await res.json();
//           return user;
//         } catch (err) {
//           console.error("❌ Authorize error:", err.message);
//           return null;
//         }
//       },
//     }),
  
//   ],
//   session: {
//     strategy: "jwt", // use JWT tokens for stateless auth
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       try {
//         const users = await getCollection(collection.user_collection);
//         const existingUser = await users.findOne({ email: user.email });
//         if (!existingUser) {
//           await users.insertOne({
//             email: user.email,
//             name: user.name,
//             image: user.image,
//             provider: account.provider,
//             providerAccountId: account.providerAccountId,
//             createdAt: new Date(),
//           });
//         }
//         return true;
//       } catch (error) {
//         console.log("error", error);
//         return false;
//       }
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user._id;
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           email: token.email,
//           name: token.name,
//         },
//       };
//     },
//   },
// };


import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { collection, getCollection } from "./getCollection";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            console.error("❌ Invalid credentials");
            return null;
          }

          const user = await res.json();

          // Ensure plain object (not MongoDB document)
          return {
            id: user._id?.toString() || user.id,
            email: user.email,
            name: user.name,
            role: user.role || "patient",
          };
        } catch (err) {
          console.error("❌ Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const users = await getCollection(collection.user_collection);
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          await users.insertOne({
            email: user.email,
            name: user.name,
            role: (user as any).role || "patient",
            provider: account?.provider,
            createdAt: new Date(),
          });
        }
        return true;
      } catch (error) {
        console.error("❌ signIn callback error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
