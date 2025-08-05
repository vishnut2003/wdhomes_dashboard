import { authOption } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/configs/dbConfig";
import ListingModel, { ListingModelInterface, ListingsStatusType } from "@/models/ListingModel";
import fs from "fs";
import fsPromise from "fs/promises";
import { getServerSession } from "next-auth";
import path from "path";
import { uploadListingsImages } from "./uploadImages";

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

            const {
                featuredImageReturnName,
                galleryImagesReturnNames,
            } = await uploadListingsImages({
                featuredImage: data.featuredImage,
                galleryImages: data.galleryImages,
                slug: data.slug,
            });

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