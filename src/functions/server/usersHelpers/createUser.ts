import { SignupUserApiRouterRequestData } from "@/app/api/user-manager/signup/route";
import { dbConnect } from "@/configs/dbConfig";
import { generateHashFromValue } from "@/functions/bcrypt";
import UserModel, { UserModelInterface } from "@/models/UserModel";
import { v4 as uuid } from "uuid";

export async function createUser({
    userData
}: {
    userData: SignupUserApiRouterRequestData,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            const userExist = await UserModel.findOne<UserModelInterface>({
                $or: [
                    { username: userData.username },
                    { email: userData.email }
                ],
            })

            if (userExist) {
                if (userExist.username === userData.username) {
                    throw new Error("Username already exist.");
                } else if (userExist.email === userData.email) {
                    throw new Error("Email address already exist.");
                }
            }

            const hashPassword = await generateHashFromValue({ value: userData.password });

            const userId = uuid();
            const {
                email,
                fullname,
                nickname,
                role,
                username,
            } = userData;

            const user: UserModelInterface = new UserModel({
                userId,
                username,
                email,
                fullname,
                nickname,
                role,
                password: hashPassword,
            })

            await user.save();

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}