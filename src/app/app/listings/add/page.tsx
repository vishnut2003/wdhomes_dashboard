import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import React from 'react'
import ListingForm from './ListingForm'

export const metadata: Metadata = {
  title: "Add Listings",
}

const AddListingsPage = async () => {

  return (
    <div>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Add Listings" />
        <ListingForm />
      </div>
    </div>
  )
}

export default AddListingsPage