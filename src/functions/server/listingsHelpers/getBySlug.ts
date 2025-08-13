import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface } from "@/models/ListingModel";

export async function getListingBySlug({ slug }: {
    slug: string,
}) {
    return new Promise<ListingModelInterface | null>(async (resolve, reject) => {
        try {

            await dbConnect();
            const listing = await ListingModel.findOne({ slug }) as ListingModelInterface | null;
            
            if (!listing) {
                return resolve(null);
            }

            listing['featuredImage'] = `/api/images/listings/featured/${listing['featuredImage']}`;

            const galleryImage: string[] = [];

            for (const image of listing['galleryImages']) {
                const data = `/api/images/listings/gallery/${image}`;
                galleryImage.push(data);
            }

            listing['galleryImages'] = galleryImage;

            return resolve(listing);

        } catch (err) {
            return reject(err);
        }
    })
}