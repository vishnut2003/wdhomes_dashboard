import { BufferFormatFileDataType } from "@/types/common-types";
import path from "path";
import fsPromise from "fs/promises";
import { fileTypeFromBuffer } from "file-type";

export async function getListingCommentUploadFile({
    filename,
}: {
    filename: string,
}) {
    return new Promise<BufferFormatFileDataType>(async (resolve, reject) => {
        try {

            const UPLOAD_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!UPLOAD_FOLDER) {
                throw new Error("LISTINGS_IMAGES_FOLDER is required in .env");
            }

            const comment_upload_folder = path.join(...UPLOAD_FOLDER.split('/'), "comment_uploads");

            const buffer = await fsPromise.readFile(
                path.join(comment_upload_folder, filename),
            )

            const fileType = await fileTypeFromBuffer(buffer);

            if (!fileType) {
                throw new Error("File type not found!");
            }

            const mimeType = fileType.mime;

            return resolve({
                buffer: buffer.toString("base64"),
                name: filename,
                type: mimeType,
            })

        } catch (err) {
            return reject(err);
        }
    })
}