import { handleCatchBlock } from "@/functions/common";
import { getListingBySlug } from "@/functions/server/listingsHelpers/getBySlug";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
    const LISTING_SITE = process.env.LISTING_SITE;

    if (!LISTING_SITE) {
        throw new Error("LISTING_SITE is not specified in .env");
    }

    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': LISTING_SITE,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}

export async function POST(request: NextRequest) {
    try {

        const { slug } = await request.json() as {
            slug: string
        };

        if (!slug) {
            throw new Error("Slug is required!");
        }

        const listing = await getListingBySlug({ slug });

        return NextResponse.json(listing);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}