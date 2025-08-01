'use client';

export async function handleAddListingFormSubmit(listingData: {
    featuredImage: File | null,
    imageGallery: File[],
    name: string,
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

            console.log(listingData);

            await new Promise(resolve => setTimeout(resolve, 5000));

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}