import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { bufferToFile } from "@/functions/common";

export async function getUploadedImages({
    featuredImageName,
    galleryImageNames,
}: {
    featuredImageName: string,
    galleryImageNames: string[],
}) {
    return new Promise<{
        featuredImage: {
            buffer: string,
            name: string,
            type: string,
        } | null,
        imageGallery: {
            buffer: string,
            name: string,
            type: string,
        }[],
    }>(async (resolve, reject) => {
        try {

            const LISTINGS_IMAGES_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!LISTINGS_IMAGES_FOLDER) {
                throw new Error("Please provide LISTINGS_IMAGES_FOLDER in .env");
            }

            const featuredImageFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'featured_images');
            const imageGalleryFolder = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'image_gallery');

            if (!fs.existsSync(featuredImageFolder) || !fs.existsSync(imageGalleryFolder)) {
                return resolve({
                    featuredImage: null,
                    imageGallery: [],
                })
            }

            const featuredImage = await fsPromise.readFile(
                path.join(featuredImageFolder, featuredImageName),
            );

            const mimeType = `image/${featuredImageName.split('.')[1]}`;

            const featuredImageFile = await bufferToFile({
                buffer: featuredImage,
                fileName: featuredImageName,
                type: mimeType,
            })

            const galleryImageFiles: {
                buffer: string,
                name: string,
                type: string,
            }[] = [];

            for (const image of galleryImageNames) {
                const imagePath = path.join(imageGalleryFolder, image);
                const buffer = await fsPromise.readFile(imagePath);

                const mimeType = `image/${image.split('.')[1]}`;

                galleryImageFiles.push({
                    buffer: buffer.toString("base64"),
                    name: image,
                    type: mimeType,
                });
            }

            return resolve({
                featuredImage: {
                    buffer: featuredImage.toString('base64'),
                    name: featuredImageName,
                    type: mimeType,
                },
                imageGallery: galleryImageFiles,
            })

        } catch (err) {
            return reject(err);
        }
    })
}