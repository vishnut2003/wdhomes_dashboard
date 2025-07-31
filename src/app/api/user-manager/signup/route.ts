import { handleCatchBlock } from "@/functions/common";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/authOptions";
import { UserRoleType } from "@/types/next-auth";
import { createUser } from "@/functions/server/usersHelpers/createUser";

export interface SignupUserApiRouterRequestData {
    fullname: string,
    username: string,
    nickname: string,
    email: string,
    password: string,
    role: UserRoleType,
}

export async function POST(request: NextRequest) {
    try {

        const userSession = await getServerSession(authOption);

        if (
            !userSession ||
            userSession.user.role !== "manager"
        ) {
            throw new Error("Need manager access to create user");
        }

        const userData = await request.json() as SignupUserApiRouterRequestData;

        await createUser({ userData });

        return NextResponse.json(true);

    } catch (err) {
        console.log(err);
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}