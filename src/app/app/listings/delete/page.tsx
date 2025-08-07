import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { getListingById } from "@/functions/server/listingsHelpers/getListingBySlug";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";

type Props = {
    searchParams: Promise<{
        id: string,
    }>,
}

const DeleteListingPage = async ({ searchParams }: Props) => {

    const listingId = (await searchParams).id;

    if (!listingId) {
        notFound()
    }

    const listing = await getListingById({ listingId });

    if (!listing) {
        notFound();
    }

    return (
        <ShowcaseSection
            title="Delete LIsting"
            className="space-y-3"
        >
            <h2
                className="text-xl font-semibold"
            >Confirm Deleting {listing.name}</h2>
            <h3
                className="font-light"
            >Slug: {listing.slug}</h3>
            <p>Please confirm to delete <b>{listing.name}</b>. All releated resources will be deleted.</p>

            <DeleteButton
                listingId={listingId}
            />
        </ShowcaseSection>
    )
}

export default DeleteListingPage