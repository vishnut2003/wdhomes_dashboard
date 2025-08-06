import { handleCatchBlock } from "@/functions/common";
import { getListingById } from "@/functions/server/listingsHelpers/getListingBySlug";
import { getUploadedImages } from "@/functions/server/listingsHelpers/getUploadImages";
import { ListingModelInterface } from "@/models/ListingModel";
import { BufferFormatFileDataType } from "@/types/common-types";
import { NextRequest, NextResponse } from "next/server";

export interface GetOneListingBySlugResponseDataInterface {
    listingData: ListingModelInterface,
    images: {
        featuredImage: BufferFormatFileDataType | null,
        galleryImage: BufferFormatFileDataType[],
    }
}

export async function POST(request: NextRequest) {
    try {

        const { listingId } = await request.json() as {
            listingId?: string,
        };

        if (!listingId) {
            throw new Error("Slug is required.");
        }

        const listing = await getListingById({ listingId });

        if (!listing) {
            throw new Error("Requested listing not found.");
        }

        const { featuredImage, imageGallery } = await getUploadedImages({
            featuredImageName: listing.featuredImage,
            galleryImageNames: listing.galleryImages,
        })

        return NextResponse.json<GetOneListingBySlugResponseDataInterface>({
            listingData: listing,
            images: {
                featuredImage,
                galleryImage: imageGallery,
            }
        });

    } catch (err) {
        console.log(err);
        const message = handleCatchBlock(err);
        return NextResponse.json(err, { status: 500 });
    }
}