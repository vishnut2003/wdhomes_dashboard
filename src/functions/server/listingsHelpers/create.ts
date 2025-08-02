import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface, ListingsStatusType } from "@/models/ListingModel";
import fs from "fs";
import fsPromise from "fs/promises";
import { getServerSession } from "next-auth";
import path from "path";

export interface CreateListingApiRequestData {
    name: string,
    slug: string,
    status: ListingsStatusType,
    featuredImage: File,
    galleryImages: File[],
    price: number,
    description: string,
    location: {
        state: string,
        city: string,
        address: string,
        pinpoint: {
            lat: number,
            lng: number,
        },
    },
    attributes: {
        label: string,
        value: string,
    }[],
}

export async function CreateListing(data: CreateListingApiRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const userSession = await getServerSession(authOption);

            if (
                !userSession
            ) {
                throw new Error("Unauthorized access.");
            }

            await dbConnect();
            const listingExist = await ListingModel.findOne({ slug: data.slug });

            if (listingExist) {
                throw new Error("Slug already exist.");
            }

            const LISTINGS_IMAGES_FOLDER = process.env.LISTINGS_IMAGES_FOLDER;

            if (!LISTINGS_IMAGES_FOLDER) {
                throw new Error("Please provide LISTINGS_IMAGES_FOLDER in .env");
            }

            const featuredImage = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'featured_images');
            const imageGallery = path.join(...LISTINGS_IMAGES_FOLDER.split('/'), 'image_gallery');

            if (!fs.existsSync(featuredImage)) {
                await fsPromise.mkdir(featuredImage, { recursive: true });
            }

            if (!fs.existsSync(imageGallery)) {
                await fsPromise.mkdir(imageGallery, { recursive: true });
            }

            const featuredImageBuffer = Buffer.from(await data.featuredImage.arrayBuffer());
            // Extract file extension from MIME type, e.g., "image/png" -> ".png"
            const ext = data.featuredImage.type ? `.${data.featuredImage.type.split('/')[1]}` : '';

            const featuredImageReturnName = `${data.slug}${ext}`;

            await fsPromise.writeFile(
                path.join(featuredImage, `${data.slug}${ext}`),
                featuredImageBuffer
            );

            const galleryImagesReturnNames = [];

            let imageIndex = 1;
            for (const image of data.galleryImages) {
                const buffer = Buffer.from(await image.arrayBuffer());
                const ext = image.type ? `.${image.type.split('/')[1]}` : '';
                await fsPromise.writeFile(
                    path.join(imageGallery, `${data.slug}-${imageIndex}${ext}`),
                    buffer,
                );
                galleryImagesReturnNames.push(`${data.slug}-${imageIndex}${ext}`);
                imageIndex++;
            }

            const listing = new ListingModel({
                ...data,
                userId: userSession.user.id,
                galleryImages: galleryImagesReturnNames,
                featuredImage: featuredImageReturnName,
            }) as ListingModelInterface;

            await listing.save();
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}