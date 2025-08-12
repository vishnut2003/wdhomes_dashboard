import { dbConnect } from "@/configs/dbConfig";
import UserModel, { UserModelInterface } from "@/models/UserModel";

export async function getOneUserByUserId({ userId }: {
    userId: string,
}) {
    return new Promise<UserModelInterface | null>(async (resolve, reject) => {
        try {

            await dbConnect();
            const user = await UserModel.findOne({ userId }) as UserModelInterface | null;
            
            if (!user) {
                resolve(null)
            }

            return resolve(user);

        } catch (err) {
            return reject(err);
        }
    })
}