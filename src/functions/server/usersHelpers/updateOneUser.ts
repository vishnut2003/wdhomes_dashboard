import { dbConnect } from "@/configs/dbConfig";
import { generateHashFromValue } from "@/functions/bcrypt";
import UserModel, { UserModelInterface } from "@/models/UserModel";

export async function updateOneUser({
    userId,
    password,
    ...userData
}: {
    userId: string,
    password?: string,
    username?: string,
    fullname?: string,
    nickname?: string,
    email?: string,
}) {

    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            const emailOrUsernameExist = await UserModel.findOne({
                $or: [
                    { email: userData.email },
                    { username: userData.username },
                ],
                userId: {
                    $ne: userId,
                }
            }) as UserModelInterface | null;

            if (emailOrUsernameExist) {
                if (emailOrUsernameExist.email === userData.email) {
                    throw new Error("Email address already exist");
                } else if (emailOrUsernameExist.username === userData.username) {
                    throw new Error("Username already exist");
                } else {
                    throw new Error("Email or Username is already exist");
                }
            }

            const data: {
                [key: string]: string,
            } = userData;

            if (password) {
                const hashPassword = await generateHashFromValue({ value: password });
                data['password'] = hashPassword;
            }

            const user = await UserModel.findOneAndUpdate(
                {
                    userId,
                },
                data,
            )

            if (!user) {
                throw new Error("User not found!");
            }

            return resolve()

        } catch (err) {
            return reject(err);
        }
    })

}