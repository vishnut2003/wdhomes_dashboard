import { User } from "next-auth";

const SUPER_ADMIN_PROFILE: User = {
    id: "13c76795580923cf66598660978d49ef",
    name: "Super Admin",
    email: null,
    image: "/images/user/user-01.png",
    role: "manager",
}

export async function verifySuperAdmin ({
    email,
    password,
}: {
    email: string,
    password: string,
}) {
    return new Promise<User | null>((resolve, reject) => {
        try {
            const SUPER_EMAIL = process.env.SUPER_ADMIN_EMAIL;
            const SUPER_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

            if (!SUPER_EMAIL || !SUPER_PASSWORD) {
                console.error("Please provide SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in env variable.");
                throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD not provided");
            }

            if (SUPER_EMAIL !== email || SUPER_PASSWORD !== password) {
                return resolve(null);
            }

            SUPER_ADMIN_PROFILE['email'] = SUPER_EMAIL;

            return resolve(SUPER_ADMIN_PROFILE);

        } catch (err) {
            return reject(err);
        }
    })
}