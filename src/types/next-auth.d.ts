import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

export type UserRoleType = "manager" | "member" | "client";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role?: UserRoleType;
        }
    }

    interface User extends DefaultUser {
        role?: UserRoleType;
    }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role?: UserRoleType;
  }
}