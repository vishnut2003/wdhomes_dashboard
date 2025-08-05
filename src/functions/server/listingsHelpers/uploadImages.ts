import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";

export async function uploadListingsImages({
    featuredImage,
    galleryImages,
    slug,
}: {
    featuredImage: File,
    galleryImages: File[],
    slug: string,
}) {
    return new Promise<{
        galleryImagesReturnNames: string[],
        featuredImageReturnName: string,
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

            const featuredImageBuffer = Buffer.from(await featuredImage.arrayBuffer());
            // Extract file extension from MIME type, e.g., "image/png" -> ".png"
            const ext = featuredImage.type ? `.${featuredImage.type.split('/')[1]}` : '';

            const featuredImageReturnName = `${slug}${ext}`;

            await fsPromise.writeFile(
                path.join(featuredImageFolder, `${slug}${ext}`),
                featuredImageBuffer
            );

            const galleryImagesReturnNames = [];

            let imageIndex = 1;
            for (const image of galleryImages) {
                const buffer = Buffer.from(await image.arrayBuffer());
                const ext = image.type ? `.${image.type.split('/')[1]}` : '';
                await fsPromise.writeFile(
                    path.join(imageGalleryFolder, `${slug}-${imageIndex}${ext}`),
                    buffer,
                );
                galleryImagesReturnNames.push(`${slug}-${imageIndex}${ext}`);
                imageIndex++;
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