import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

type UserRole = "manager" | "member" | "client";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role?: UserRole;
        }
    }

    interface User extends DefaultUser {
        role?: UserRole;
    }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role?: UserRole;
  }
}