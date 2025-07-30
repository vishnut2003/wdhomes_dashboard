import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifySuperAdmin } from "./verifySuperAdmin";

export const authOption: NextAuthOptions = {
    providers: [
        Credentials({
            id: "email",
            name: "email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {

                try {
                    if (!credentials?.email || !credentials.password) {
                        return null;
                    }

                    const superAdmin = await verifySuperAdmin({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (superAdmin) {
                        return superAdmin;
                    }

                    return null;
                } catch (err) {
                    console.log("Catch", err);
                    return null
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        newUser: "/app",
    },
    callbacks: {
        async jwt({ token, user }) {
            
            if (user && user.role) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {
            
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }

            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST };