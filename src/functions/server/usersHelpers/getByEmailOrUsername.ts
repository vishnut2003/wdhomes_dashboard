import { dbConnect } from "@/configs/dbConfig";
import UserModel, { UserModelInterface } from "@/models/UserModel";

export async function getUserByEmailOrUsername({ emailOrUsername }: {
    emailOrUsername: string,
}) {
    return new Promise<UserModelInterface | null>(async (resolve, reject) => {
        try {

            await dbConnect();

            const user = await UserModel.findOne<UserModelInterface>({
                $or: [
                    { username: emailOrUsername },
                    { email: emailOrUsername },
                ],
            })

            return resolve(user);

        } catch (err) {
            return reject(err);
        }
    })
}