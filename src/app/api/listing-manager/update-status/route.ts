import { handleCatchBlock } from "@/functions/common";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/authOptions";
import { ListingsStatusType } from "@/models/ListingModel";
import { updateOneListingData } from "@/functions/server/listingsHelpers/updateOne";

export interface UpdateListingStatusApiRequestData {
    listingId: string,
    status: ListingsStatusType,
}

export async function POST(request: NextRequest) {
    try {

        const {
            listingId,
            status,
        } = await request.json() as UpdateListingStatusApiRequestData;

        const userSession = await getServerSession(authOption);

        if (!userSession) {
            throw new Error("Unauthorized access.");
        }

        if (
            status === "publish" &&
            userSession.user.role !== "manager"
        ) {
            throw new Error("Only manager can publish listing.")
        }

        await updateOneListingData({
            listingId,
            status,
        })

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}