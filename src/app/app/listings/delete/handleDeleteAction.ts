'use server';

import { handleCatchBlock } from "@/functions/common";
import { deleteListingById } from "@/functions/server/listingsHelpers/deleteOneById";

export async function handleDeleteConfirm(prevState: unknown, formData: FormData): Promise<{
    success: boolean,
    message: string,
}> {
    try {

        const listingId = formData.get('listingId')?.toString();

        if (!listingId) {
            throw new Error("ListingId is required.");
        }

        await deleteListingById({ listingId });

        return ({
            success: true,
            message: "Listing deleted.",
        })

    } catch (err) {
        const message = handleCatchBlock(err);
        return ({
            success: false,
            message,
        })
    }
}