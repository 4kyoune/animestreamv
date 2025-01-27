import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from 'next-auth/adapters';
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                })
                if (!existingUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)
                if (!passwordMatch) {
                    return null
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            }
        }),
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        })
    ],
    pages: {
        signIn: '/sign-in',
    },
    adapter: PrismaAdapter(db as PrismaClient) as Adapter,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, user }) {
            session.user = user
            return session
        }
    },
    events: {
        async signIn({ user }) {
            console.log({ user }, "sign in")
        }
    }
};