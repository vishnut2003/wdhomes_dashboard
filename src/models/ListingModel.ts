import { Label, Value } from "@radix-ui/react-select";
import mongoose from "mongoose";
import { UserModelInterface } from "./UserModel";

export type ListingsStatusType = "review" | "pending" | "publish";

export interface ListingModelInterface extends mongoose.Document {
    name: string,
    slug: string,
    status: ListingsStatusType,
    userId: string | UserModelInterface | undefined,
    featuredImage: string,
    galleryImages: string[],
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

const listingSchema = new mongoose.Schema<ListingModelInterface>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['review', 'pending', 'publish'],
        required: true,
    },
    userId: {
        type: String,
        ref: 'Users',
        required: true,
    },
    featuredImage: {
        type: String,
        required: true,
        unique: true,
    },
    galleryImages: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        pinpoint: {
            lat: {
                type: String,
                required: true,
            },
            lng: {
                type: String,
                required: true,
            },
        },
    },
    attributes: [
        {
            label: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }
    ],
});

const ListingModel = mongoose.models.Listings || mongoose.model('Listings', listingSchema);
export default ListingModel;