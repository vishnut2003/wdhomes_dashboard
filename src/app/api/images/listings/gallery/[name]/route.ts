import { handleCatchBlock } from "@/functions/common";
import { getOneListingGalleryImage } from "@/functions/server/listingsHelpers/getOneGalleryImage";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{
        name: string,
    }>
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

export async function GET(request: NextRequest, {
    params,
}: Props) {
    try {

        const filename = (await params).name;

        const imageData = await getOneListingGalleryImage({
            filename,
        })

        if (!imageData) {
            throw new Error("Not found!");
        }

        const buffer = Buffer.from(imageData.buffer, "base64");

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': imageData.type, // set correct type
                'Content-Length': buffer.length.toString(),
            },
        })

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 404 });
    }
}