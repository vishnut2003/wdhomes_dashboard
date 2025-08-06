import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function uploadListingsImages({
    featuredImage,
    galleryImages,
    featureExistingName,
}: {
    featuredImage: File | null,
    galleryImages: File[],
    featureExistingName?: string,
}) {
    return new Promise<{
        galleryImagesReturnNames: string[],
        featuredImageReturnName: string | null,
    }>(async (resolve, reject) => {
        try {
            const LISTINGS_IMAGES_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!LISTINGS_IMAGES_FOLDER) {
                throw new Error("Please provide LISTINGS_IMAGES_FOLDER in .env");
            }

            const featuredImageFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'featured_images');
            const imageGalleryFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'image_gallery');

            if (!fs.existsSync(featuredImageFolder)) {
                await fsPromise.mkdir(featuredImageFolder, { recursive: true });
            }

            if (!fs.existsSync(imageGalleryFolder)) {
                await fsPromise.mkdir(imageGalleryFolder, { recursive: true });
            }

            let featuredImageReturnName: string | null = null;

            if (featuredImage) {
                const featuredImageBuffer = Buffer.from(await featuredImage.arrayBuffer());
                // Extract file extension from MIME type, e.g., "image/png" -> ".png"
                const ext = featuredImage.type ? `.${featuredImage.type.split('/')[1]}` : '';

                featuredImageReturnName = `${featureExistingName || uuid()}${ext}`;

                await fsPromise.writeFile(
                    path.join(featuredImageFolder, featuredImageReturnName),
                    featuredImageBuffer
                );
            }

            const galleryImagesReturnNames = [];

            for (const image of galleryImages) {
                const buffer = Buffer.from(await image.arrayBuffer());
                const ext = image.type ? `.${image.type.split('/')[1]}` : '';
                const imagename = uuid();
                await fsPromise.writeFile(
                    path.join(imageGalleryFolder, `${imagename}${ext}`),
                    buffer,
                );
                galleryImagesReturnNames.push(`${imagename}${ext}`);
            }

            return resolve({
                featuredImageReturnName,
                galleryImagesReturnNames,
            })

        } catch (err) {
            return reject(err);
        }
    })
}