'use client';

export async function convertAddressToCord(address: string) {
    return new Promise<{
        lat: number,
        lng: number,
    } | null>(async (resolve, reject) => {
        try {

            const geocoder = new window.google.maps.Geocoder();

            if (!geocoder) {
                throw new Error("Geocoder is not enabled.");
            }

            const { results } = await geocoder.geocode({ address });

            if (!results[0].geometry.location) {
                window.alert("Coordinates not found.")
                return resolve(null)
            }

            return resolve({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
            })

        } catch (err) {
            return reject(err);
        }
    })
}