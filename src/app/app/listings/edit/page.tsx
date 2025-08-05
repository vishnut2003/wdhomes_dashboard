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
        slug: string,
    }>
}

const EditListingPage = async ({
    searchParams,
}: Props) => {

    const slug = (await searchParams).slug;

    if (!slug) {
        notFound();
    }

    return (
        <div>
            <div className="mx-auto w-full max-w-[1080px]">
                <Breadcrumb pageName="Add Listings" />
                <ListingForm
                    slug={slug}
                />
            </div>
        </div>
    )
}

export default EditListingPage