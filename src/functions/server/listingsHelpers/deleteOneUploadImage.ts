import path from "path";
import fsPromise from "fs/promises";

export async function deleteOneListingUploadImage({
    name,
    type,
}: {
    name: string,
    type: "featured" | "gallery",
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const LISTINGS_IMAGES_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!LISTINGS_IMAGES_FOLDER) {
                throw new Error("Please provide LISTINGS_IMAGES_FOLDER in .env");
            }

            const featuredImageFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'featured_images');
            const imageGalleryFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'image_gallery');

            const filePath = path.join(
                `${type === "featured" ? featuredImageFolder : imageGalleryFolder}`,
                name,
            )

            await fsPromise.unlink(filePath);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}