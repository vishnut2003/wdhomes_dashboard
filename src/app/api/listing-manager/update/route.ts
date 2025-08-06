import { handleCatchBlock } from "@/functions/common";
import { updateOneListingData } from "@/functions/server/listingsHelpers/updateOne";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const featuredImage = formData.get('featuredImage') as File;
        const imageGallery = formData.getAll('imageGallery') as File[];
        const name = formData.get('name')?.toString();
        const slug = formData.get('slug')?.toString();
        const price = formData.get('price')?.toString();
        const description = formData.get('description')?.toString();
        const location = formData.get('location')?.toString();
        const attributes = formData.get('attributes')?.toString();
        const listingId = formData.get('listingId')?.toString();

        if (!listingId) {
            throw new Error("Listing ID is required.")
        }

        if (
            !featuredImage ||
            !imageGallery ||
            !name ||
            !slug ||
            !price ||
            !description ||
            !location ||
            !attributes
        ) {
            throw new Error("Required fields are missing.");
        }

        const locationObject = JSON.parse(location || "");
        const attributesObject = JSON.parse(attributes || "");

        const priceNumber = parseInt(price);

        await updateOneListingData({
            attributes: attributesObject,
            description,
            images: {
                featuredImage,
                galleryImages: imageGallery,
            },
            location: locationObject,
            name,
            price: priceNumber,
            slug,
            listingId
        })

        return NextResponse.json(true);

    } catch (err) {
        console.log(err);
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}