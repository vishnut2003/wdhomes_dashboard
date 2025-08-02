'use client';

import axios from "axios";

export async function handleAddListingFormSubmit(listingData: {
    featuredImage: File | null,
    imageGallery: File[],
    name: string,
    slug: string,
    price: string,
    description: string,
    location: {
        state: string,
        city: string,
        address: string,
        pinpoint: {
            lat: number,
            lng: number,
        } | null,
    },
    attributes: {
        label: string,
        value: string,
    }[]
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const rootDataValidate = [
                'featuredImage',
                'name',
                'slug',
                'price',
                'description',
            ];

            for (const field of rootDataValidate) {
                const value = listingData[field as keyof typeof listingData]
                if (!value) {
                    throw new Error(`${field} is required.`);
                }
            }

            for (const key of Object.keys(listingData.location)) {
                const value = listingData.location[key as keyof typeof listingData.location]

                if (!value) {
                    const message = key === "pinpoint" ? "Select location from Google map." : `${key} is required`;
                    throw new Error(message);
                }
            }

            for (const attribute of listingData.attributes) {
                if (!attribute.label || !attribute.value) {
                    throw new Error("Attributes fields must be filled.");
                }
            }

            if (listingData.imageGallery.length === 0) {
                throw new Error("Select Atleast one gallery image.");
            }

            const formData = new FormData();

            for (const [key, value] of Object.entries(listingData)) {
                let data: string | File = ""
                if (key === "location" || key === "attributes") {
                    data = JSON.stringify(value);
                } else if (key === "imageGallery") {
                    for (const image of value as File[]) {
                        formData.append('imageGallery', image);
                    }
                    continue;
                } else {
                    data = value as string;
                }

                formData.append(key, data);
            }

            await axios.post('/api/listing-manager/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}