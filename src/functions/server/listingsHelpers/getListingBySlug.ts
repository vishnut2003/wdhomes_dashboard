import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface } from "@/models/ListingModel";
import { getServerSession } from "next-auth";

export async function getListingBySlug({
    slug,
}: {
    slug: string,
}) {
    return new Promise<ListingModelInterface | null>(async (resolve, reject) => {
        try {
            await dbConnect();

            const userSession = await getServerSession(authOption);

            if (!userSession) {
                return resolve(null);
            }

            const listing: ListingModelInterface | null = await ListingModel.findOne({
                slug,
                userId: userSession.user.id,
            })

            if (listing) {
                return resolve(listing);
            } else {
                resolve(null)
            }

        } catch (err) {
            return reject(err);
        }
    })
}