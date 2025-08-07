import { handleCatchBlock } from "@/functions/common";
import { getAllListingsByCity } from "@/functions/server/listingsHelpers/getAllListingByCity";
import { NextRequest, NextResponse } from "next/server";

type RequestData = {
    city: string,
    page: number,
}

export async function OPTIONS() {
    const LISTING_SITE = process.env.LISTING_SITE;

    if (!LISTING_SITE) {
        throw new Error("LISTING_SITE is not specified in .env");
    }

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': LISTING_SITE, // Use specific origin in production
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}


export async function POST(request: NextRequest) {
    try {

        const {
            city,
            page,
        } = await request.json() as RequestData;

        const response = await getAllListingsByCity({
            city,
            page,
        })

        return NextResponse.json(response)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}