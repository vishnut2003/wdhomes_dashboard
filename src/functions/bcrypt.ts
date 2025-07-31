import { Value } from "@radix-ui/react-select";
import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export async function generateHashFromValue({ value }: {
    value: string,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const salt = await bcrypt.genSalt(SALT_ROUND);
            const hashValue = await bcrypt.hash(value, salt);

            return resolve(hashValue);

        } catch (err) {
            return reject(err);
        }
    })
}

export function compareHashValue ({
    hash,
    value,
}: {
    value: string,
    hash: string,
}) {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const match = await bcrypt.compare(value, hash);
            return resolve(match);
        } catch (err) {
            return reject(err);
        }
    })
}