'use client';

import { UpdateOneUserApiRouterRequestData } from "@/app/api/user-manager/update-one/route";
import { handleCatchBlock } from "@/functions/common";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export async function handleMyAccountFormSubmit({
    resetPassword,
    setInProgress,
    setSuccess,
    setError,
    ...formData
}: {
    userId: string,

    // Form data
    username: string,
    fullname: string,
    nickname: string,
    email: string,

    // Password
    resetPassword: boolean,
    password: string,

    // Others
    setInProgress: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
}) {
    return new Promise<void>(async (resolve) => {
        try {

            setInProgress(true);
            setError(null);

            if (
                !formData.username ||
                !formData.nickname || 
                !formData.email ||
                !formData.fullname
            ) {
                throw new Error("Required field are empty!");
            }

            const requestData: UpdateOneUserApiRouterRequestData = {
                userId: formData.userId,
                email: formData.email,
                fullname: formData.fullname,
                nickname: formData.nickname,
                username: formData.username,
            };

            if (resetPassword) {
                if (!formData.password) {
                    throw new Error("Password is empty!");
                }

                requestData['password'] = formData.password;
            }

            await axios.post('/api/user-manager/update-one', requestData);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            setInProgress(false);

            return resolve();

        } catch (err) {
            setInProgress(false);
            const message = handleCatchBlock(err);
            setError(message);
        }
    })
}