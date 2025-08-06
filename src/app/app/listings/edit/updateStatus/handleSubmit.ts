import { UpdateListingStatusApiRequestData } from "@/app/api/listing-manager/update-status/route";
import { ListingsStatusType } from "@/models/ListingModel";
import axios from "axios";

export async function handleStatusUpdate({
    listingId,
    status,
}: {
    status: ListingsStatusType,
    listingId: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const requestData: UpdateListingStatusApiRequestData = {
                listingId,
                status,
            }
            await axios.post<boolean>('/api/listing-manager/update-status', requestData);
            return resolve()

        } catch (err) {
            return reject(err);
        }
    })
}