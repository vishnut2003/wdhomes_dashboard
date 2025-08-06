import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import React from 'react'
import ListingForm from './ListingForm'
import { notFound } from 'next/navigation'
import { getListingBySlug } from '@/functions/server/listingsHelpers/getListingBySlug'
import { getUploadedImages } from '@/functions/server/listingsHelpers/getUploadImages'
import ErrorElement from '@/components/ui-elements/ErrorElement'

export const metadata: Metadata = {
    title: "Edit Listing",
}

type Props = {
    searchParams: Promise<{
        id: string,
    }>
}

const EditListingPage = async ({
    searchParams,
}: Props) => {

    const listingId = (await searchParams).id;

    if (!listingId) {
        notFound();
    }

    return (
        <div>
            <div className="mx-auto w-full max-w-[1080px]">
                <Breadcrumb pageName="Add Listings" />
                <ListingForm
                    currentListingId={listingId}
                />
            </div>
        </div>
    )
}

export default EditListingPage