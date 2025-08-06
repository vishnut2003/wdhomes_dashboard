import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface } from "@/models/ListingModel";
import { getServerSession } from "next-auth";

export async function getListingById({
    listingId,
}: {
    listingId: string,
}) {
    return new Promise<ListingModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();

            const userSession = await getServerSession(authOption);

            if (!userSession) {
                throw new Error("Unauthorized access");
            }

            const listing: ListingModelInterface | null = await ListingModel.findById(listingId);

            if (!listing) {
                throw new Error("Listing not found");
            } else if (listing.userId !== userSession.user.id) {
                if (userSession.user.role !== "manager") {
                    throw new Error("Unauthorized access.");
                }
            }

            return resolve(listing);

        } catch (err) {
            return reject(err);
        }
    })
}