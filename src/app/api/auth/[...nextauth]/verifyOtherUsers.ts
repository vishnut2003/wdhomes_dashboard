import { compareHashValue } from "@/functions/bcrypt";
import { getUserByEmailOrUsername } from "@/functions/server/usersHelpers/getByEmailOrUsername";
import { User } from "next-auth";

export async function verifyOtherUsers ({
    emailOrUsername,
    password,
}: {
    emailOrUsername: string,
    password: string,
}) {
    return new Promise<User | null>(async (resolve, reject) => {
        try {
            const user = await getUserByEmailOrUsername({
                emailOrUsername
            })

            if (!user) {
                return resolve(null);
            }

            const passwordMatch = await compareHashValue({
                value: password,
                hash: user.password,
            });

            if (!passwordMatch) {
                return resolve(null);
            }

            const userData: User = {
                id: user.userId,
                email: user.email,
                name: user.nickname,
                role: user.role,
            }

            return resolve(userData);

        } catch (err) {
            return reject(err);
        }
    })
}