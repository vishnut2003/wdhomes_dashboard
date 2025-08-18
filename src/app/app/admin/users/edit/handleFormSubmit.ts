import { UpdateOneUserApiRouterRequestData } from "@/app/api/user-manager/update-one/route";
import { handleCatchBlock } from "@/functions/common";
import { UserRoleType } from "@/types/next-auth";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export async function handleEditUserFormSubmit({
    setError,
    setInProgress,
    setSuccess,
    userData,
    userId,
}: {
    userId: string,
    userData: {
        username: string,
        email: string,
        fullname: string,
        nickname: string,
        password: string,
        role: UserRoleType,
    },
    setSuccess: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>,
    setInProgress: Dispatch<SetStateAction<boolean>>,
}) {
    return new Promise(async (resolve, reject) => {
        try {

            setInProgress(true);

            if (
                !userData.email ||
                !userData.fullname || 
                !userData.nickname ||
                !userData.role ||
                !userData.username
            ) {
                throw new Error("Required fields are empty");
            }

            const requestData: UpdateOneUserApiRouterRequestData = {
                userId,
                email: userData.email,
                fullname: userData.fullname,
                nickname: userData.nickname,
                username: userData.username,
            }

            if (userData.password) {
                requestData['password'] = userData.password;
            }

            await axios.post('/api/user-manager/update-one', requestData);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            setInProgress(false);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
            setInProgress(false);
        }
    })
}