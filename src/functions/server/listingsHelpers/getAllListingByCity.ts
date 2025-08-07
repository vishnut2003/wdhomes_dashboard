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

            const listingsCount = await ListingModel.countDocuments(query);
            const totalPage = Math.ceil(listingsCount / LISTING_PER_PAGE);

            if (listingsCount < skip) {
                skip = 0;
                page = 1;
            }

            const listings = await ListingModel.find(query) as ListingModelInterface[];

            return resolve({
                data: listings,
                page,
                totalPage,
                totalRecords: listingsCount,
            })

        } catch (err) {
            return reject(err);
        }
    })
}