import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface, ListingsStatusType } from "@/models/ListingModel";
import { uploadListingsImages } from "./uploadImages";
import { deleteOneListingUploadImage } from "./deleteOneUploadImage";

interface CreateListingApiRequestData {
    name?: string,
    slug?: string,
    status?: ListingsStatusType,
    images?: {
        featuredImage?: File,
        galleryImages?: File[],
    },
    price?: number,
    description?: string,
    location?: {
        state?: string,
        city?: string,
        address?: string,
        pinpoint?: {
            lat?: number,
            lng?: number,
        },
    },
    attributes?: {
        label?: string,
        value?: string,
    }[],
    listingId: string,
}

export async function updateOneListingData(data: CreateListingApiRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            const {
                listingId,
                images,
                ...listingData
            } = data;

            const existingListing = await ListingModel.findById(listingId) as ListingModelInterface;

            if (!existingListing) {
                throw new Error("Listing not found.");
            }

            if (images?.featuredImage) {
                await uploadListingsImages({
                    featuredImage: images.featuredImage,
                    galleryImages: [],
                    featureExistingName: existingListing.featuredImage.split('.')[0],
                })
            }

            if (images?.galleryImages && images.galleryImages.length > 0) {

                for (const image of existingListing.galleryImages) {
                    await deleteOneListingUploadImage({
                        name: image,
                        type: "gallery",
                    })
                }

                const { galleryImagesReturnNames } = await uploadListingsImages({
                    featuredImage: null,
                    galleryImages: images.galleryImages,
                })

                await ListingModel.findByIdAndUpdate(listingId, {
                    galleryImages: galleryImagesReturnNames,
                })
            }

            await ListingModel.findByIdAndUpdate(listingId, listingData);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}