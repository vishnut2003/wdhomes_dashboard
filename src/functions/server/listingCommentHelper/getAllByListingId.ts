import { dbConnect } from "@/configs/dbConfig";
import ListingCommentsModel, { ListingCommentsModelInterface } from "@/models/ListingCommentsModel";

export async function getAllCommentsByListingId({
    listingId,
}: {
    listingId: string,
}) {
    return new Promise<ListingCommentsModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();
            const comments = await ListingCommentsModel.find({ listingId }) as ListingCommentsModelInterface[];
            return resolve(comments || []);

        } catch (err) {
            return reject(err);
        }
    })
}