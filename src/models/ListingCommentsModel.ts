import mongoose from "mongoose";

export interface ListingCommentsModelInterface extends mongoose.Document {
    userId: string,
    listingId: string,
    comment: string,
    files: string[],
}

const listingCommentSchema = new mongoose.Schema<ListingCommentsModelInterface>({
    listingId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    files: {
        type: [String],
        default: [],
    }
})

const ListingCommentsModel = mongoose.models.ListingComments || mongoose.model('ListingComments', listingCommentSchema);
export default ListingCommentsModel;