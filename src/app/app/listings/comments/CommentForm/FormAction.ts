"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { handleCatchBlock } from "@/functions/common";
import { createOneComment } from "@/functions/server/listingCommentHelper/createOne";
import { getServerSession } from "next-auth";

export async function commentFormAction (prevState: unknown, formData: FormData) {
    try {

        const comment = formData.get('comment')?.toString();
        const files = formData.getAll('files') as File[];
        const listingId = formData.get('listingId')?.toString();

        const userSession = await getServerSession(authOption);

        if (!userSession) {
            throw new Error("Unauthorized access.")
        }

        if (!listingId) {
            throw new Error("Listing ID required.")
        }

        if (!comment) {
            throw new Error("Comment field is required");
        }

        await createOneComment({
            comment,
            files,
            listingId,
            userId: userSession.user.id,
        });

        return ({
            success: true,
            message: "Comment Added",
        })

    } catch (err) {
        const message = handleCatchBlock(err);
        return ({
            success: false,
            message,
        })
    }
}