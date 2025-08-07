import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface } from "@/models/ListingModel";
import { deleteOneListingUploadImage } from "./deleteOneUploadImage";

export async function deleteListingById ({
    listingId,
}: {
    listingId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();
            const listing = await ListingModel.findByIdAndDelete(listingId) as ListingModelInterface | null;

            if (!listing) {
                throw new Error("Listing not found.");
            }

            await deleteOneListingUploadImage({
                name: listing.featuredImage,
                type: "featured",
            });

            for (const image of listing.galleryImages) {
                await deleteOneListingUploadImage({
                    name: image,
                    type: "gallery",
                })
            }

            resolve();

        } catch (err) {
            return reject(err);
        }
    })
}