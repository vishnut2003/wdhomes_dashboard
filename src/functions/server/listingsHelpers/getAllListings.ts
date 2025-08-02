import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface, ListingsStatusType } from "@/models/ListingModel";
import UserModel, { UserModelInterface } from "@/models/UserModel";
import { getServerSession } from "next-auth";

export interface GetAllListingsDataResponse {
    data: ListingModelInterface[],
    totalPages: number,
    currentPage: number,
    totalRecords: number,
}

export interface GetAllUsersFilterOptionsInterface {
    search?: string,
    pageNumber: number,
    status?: ListingsStatusType,
}

const LISTINGS_TABLE_LIMIT = 10;

export async function getAllListings({
    pageNumber,
    search,
    status,
}: GetAllUsersFilterOptionsInterface) {
    return new Promise<GetAllListingsDataResponse>(async (resolve, reject) => {
        try {
            await dbConnect();

            let skip = (pageNumber - 1) * LISTINGS_TABLE_LIMIT;

            const searchRegExp = search ? { $regex: new RegExp(search, 'i') } : null;

            let query: any = {};

            if (search) {
                query = {
                    $or: [
                        { name: searchRegExp },
                        { "location.state": searchRegExp },
                        { "location.city": searchRegExp },
                        { "location.address": searchRegExp },
                    ],
                }
            }

            const userSession = await getServerSession(authOption);

            if (!userSession) {
                throw new Error("unauthorized access.");
            }

            if (userSession.user.role !== "manager") {
                query['userId'] = userSession.user.id;
            }

            if (status) {
                query['status'] = status;
            }

            const totalRecords = await ListingModel.countDocuments(query);

            if (totalRecords < skip) {
                skip = 0;
                pageNumber = 1;
            }

            const listings = await ListingModel.find(query).skip(skip).limit(LISTINGS_TABLE_LIMIT) as ListingModelInterface[];

            const userIds: string[] = []
            for (const listing of listings) {
                userIds.push(listing.userId as string);
            }

            const usersData = await UserModel.find({
                userId: userIds,
            }) as UserModelInterface[];

            listings.map((listing, index) => {
                const user = usersData.find((user) => listing.userId === user.userId);
                listings[index]['userId'] = user;
            })

            const totalPages = Math.ceil(totalRecords / LISTINGS_TABLE_LIMIT);

            const response: GetAllListingsDataResponse = {
                data: listings,
                currentPage: pageNumber,
                totalPages,
                totalRecords,
            }

            return resolve(response)
        } catch (err) {
            return reject(err);
        }
    })
}