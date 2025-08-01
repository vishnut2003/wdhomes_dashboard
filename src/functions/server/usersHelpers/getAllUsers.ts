import { dbConnect } from "@/configs/dbConfig";
import UserModel, { UserModelInterface } from "@/models/UserModel";
import { UserRoleType } from "@/types/next-auth";

export interface GetAllUsersFilterOptionsInterface {
    search?: string,
    pageNumber: number,
    role?: UserRoleType,
}

export interface GetAllUsersDataResponse {
    data: UserModelInterface[],
    totalPages: number,
    currentPage: number,
    totalRecords: number,
}

const USERS_TABLE_LIMIT = 10;

export async function getAllUsers({
    pageNumber,
    search,
    role,
}: GetAllUsersFilterOptionsInterface) {
    return new Promise<GetAllUsersDataResponse>(async (resolve, reject) => {
        try {
            await dbConnect();

            let skip = (pageNumber - 1) * USERS_TABLE_LIMIT;

            const searchRegExp = search ? { $regex: new RegExp(search, 'i') } : null;

            let query: any = {};

            if (search) {
                query = {
                    $or: [
                        { fullname: searchRegExp },
                        { email: searchRegExp },
                        { username: searchRegExp },
                    ],
                }
            }

            if (role) {
                query['role'] = role;
            }

            const totalRecords = await UserModel.countDocuments(query);

            if (totalRecords < skip) {
                skip = 0;
                pageNumber = 1;
            }

            const users = await UserModel.find(query).skip(skip).limit(USERS_TABLE_LIMIT);

            const totalPages = Math.ceil(totalRecords / USERS_TABLE_LIMIT);

            const response: GetAllUsersDataResponse = {
                data: users,
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