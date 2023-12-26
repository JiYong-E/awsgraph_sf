
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
      GithubProvider({
        clientId: '96770f0aaadf640f0f18',
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    secret : process.env.NEXTAUTH_SECRET,
    adapter : MongoDBAdapter(connectDB)
  };

export default NextAuth(authOptions); 
