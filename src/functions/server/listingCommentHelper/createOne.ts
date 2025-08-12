import { dbConnect } from "@/configs/dbConfig";
import ListingCommentsModel from "@/models/ListingCommentsModel";
import { uploadListingCommentFile } from "./uploadFile";

export async function createOneComment({
    comment,
    files,
    listingId,
    userId,
}: {
    comment: string,
    listingId: string,
    files: File[],
    userId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            const filenames: string[] = [];

            for (const file of files) {
                const filename = await uploadListingCommentFile({ file });
                filenames.push(filename);
            }

            const listing = new ListingCommentsModel({
                listingId,
                comment,
                files: filenames,
                userId,
            })

            await listing.save();

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}