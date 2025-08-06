import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import React from 'react'
import ListingForm from './ListingForm'
import { notFound } from 'next/navigation'
import UpdateListingStatusElement from './updateStatus'
import { getListingById } from '@/functions/server/listingsHelpers/getListingBySlug'
import { getServerSession } from 'next-auth'

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

    const listingData = await getListingById({ listingId })

    return (
        <div>
            <div className="mx-auto w-full max-w-[1080px] space-y-5">
                <Breadcrumb pageName="Edit Listing" />

                <UpdateListingStatusElement
                    listingId={listingId}
                    activeStatus={listingData.status}
                />

                <h2
                    className='text-xl font-semibold'
                >Update Listing Data</h2>
                <ListingForm
                    currentListingId={listingId}
                />
            </div>
        </div>
    )
}

export default EditListingPage