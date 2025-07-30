import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role?: string | null;
        }
    }

    interface User extends DefaultUser {
        role?: string | null;
    }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role?: string | null;
  }
}