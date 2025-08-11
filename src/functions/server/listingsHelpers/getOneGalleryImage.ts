import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { BufferFormatFileDataType } from "@/types/common-types";

export async function getOneListingGalleryImage({
    filename
}: {
    filename: string,
}) {
    return new Promise<BufferFormatFileDataType | null>(async (resolve, reject) => {
        try {

            const LISTINGS_IMAGES_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!LISTINGS_IMAGES_FOLDER) {
                throw new Error("Please provide LISTINGS_IMAGES_FOLDER in .env");
            }

            const imageGalleryFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'image_gallery');

            if (!fs.existsSync(imageGalleryFolder)) {
                return resolve(null);
            }

            const imageData = await fsPromise.readFile(
                path.join(imageGalleryFolder, filename),
            )

            const mimeType = `image/${filename.split('.')[1]}`;

            if (!imageData) {
                return resolve(null);
            }

            return resolve({
                buffer: imageData.toString('base64'),
                name: filename,
                type: mimeType,
            })

        } catch (err) {
            return reject(err);
        }
    })
}