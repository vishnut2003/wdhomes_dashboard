import { handleCatchBlock } from "@/functions/common";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/authOptions";
import { getAllUsers, GetAllUsersFilterOptionsInterface } from "@/functions/server/usersHelpers/getAllUsers";

export async function POST(request: NextRequest) {
    try {

        const userSession = await getServerSession(authOption);

        if (userSession?.user.role !== "manager") {
            throw new Error("Only manager can manage users.");
        }

        const requestData = await request.json() as GetAllUsersFilterOptionsInterface;

        const response = await getAllUsers(requestData);

        return NextResponse.json(response);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}