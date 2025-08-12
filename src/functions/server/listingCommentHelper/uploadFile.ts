import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { v4 as uuid } from "uuid";

export async function uploadListingCommentFile({ file }: {
    file: File,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const UPLOAD_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!UPLOAD_FOLDER) {
                throw new Error("LISTINGS_IMAGES_FOLDER is required in .env");
            }

            const comment_upload_folder = path.join(...UPLOAD_FOLDER.split('/'), "comment_uploads");

            if (!fs.existsSync(comment_upload_folder)) {
                fsPromise.mkdir(comment_upload_folder, { recursive: true });
            }

            const uid = uuid();
            const ext = file.name.split('.')[1];

            const filename = `${uid}.${ext}`;

            const buffer = Buffer.from(await file.arrayBuffer());
            await fsPromise.writeFile(
                path.join(comment_upload_folder, filename),
                buffer,
            )

            return resolve(filename)

        } catch (err) {
            return reject(err);
        }
    })
}