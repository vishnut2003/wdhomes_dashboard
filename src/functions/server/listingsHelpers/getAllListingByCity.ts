import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface } from "@/models/ListingModel";

const LISTING_PER_PAGE = 10;

export async function getAllListingsByCity({
    city,
    page,
}: {
    city: string,
    page: number,
}) {
    return new Promise<{
        data: ListingModelInterface[],
        page: number,
        totalPage: number,
        totalRecords: number,
    }>(async (resolve, reject) => {
        try {

            let skip = (page - 1) * LISTING_PER_PAGE;
            const status = "publish";

            let query = {
                status,
                'location.city': city,
            }

            await dbConnect();

            const listingsCount = await ListingModel.countDocuments(query);
            const totalPage = Math.ceil(listingsCount / LISTING_PER_PAGE);

            if (listingsCount < skip) {
                skip = 0;
                page = 1;
            }

            const listings = await ListingModel.find(query) as ListingModelInterface[];

            const finalListingData: ListingModelInterface[] = []

            for (const listing of listings) {
                listing['featuredImage'] = `/api/images/listings/featured/${listing.featuredImage}`;

                const galleryImages: string[] = []
                for (const image of listing.galleryImages) {
                    const filename = `/api/images/listings/gallery/${image}`;
                    galleryImages.push(filename);
                }

                listing['galleryImages'] = galleryImages;
                finalListingData.push(listing);
            }

            return resolve({
                data: finalListingData,
                page,
                totalPage,
                totalRecords: listingsCount,
            })

        } catch (err) {
            return reject(err);
        }
    })
}