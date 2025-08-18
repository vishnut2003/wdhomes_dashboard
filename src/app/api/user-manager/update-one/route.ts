import { handleCatchBlock } from "@/functions/common";
import { updateOneUser } from "@/functions/server/usersHelpers/updateOneUser";
import { NextRequest, NextResponse } from "next/server";

export interface UpdateOneUserApiRouterRequestData {
    userId: string,
    username?: string,
    fullname?: string,
    nickname?: string,
    email?: string,
    password?: string,
}

export async function POST(request: NextRequest) {
    try {

        const {
            userId,
            ...data
        } = await request.json() as UpdateOneUserApiRouterRequestData;

        await updateOneUser({
            ...data,
            userId,
        });

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}