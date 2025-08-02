import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import AllListingsTable from '@/components/Tables/listings-table'
import { Button } from '@/components/ui-elements/button'
import { getAllListings } from '@/functions/server/listingsHelpers/getAllListings'
import { ListingsStatusType } from '@/models/ListingModel'
import { RiAddLine } from '@remixicon/react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "All Listings",
}

type Props = {
  searchParams: Promise<{
    search?: string,
    status?: ListingsStatusType,
    page?: string,
  }>
}

const AllListingsPage = async ({
  searchParams,
}: Props) => {

  const queries = await searchParams;

  let pageNumber: string | number = queries.page || '1';
  pageNumber = parseInt(pageNumber);

  const search = queries.search
  const status = queries.status;

  const response = await getAllListings({
    pageNumber,
    search,
    status,
  })

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="All Listings" />
      <Link
        className='flex items-center gap-3 py-3 px-4 rounded-[10px] bg-primary text-white w-max mb-3'
        href={'/app/listings/add'}
      >
        <RiAddLine
          size={20}
        />
        Add Listings
      </Link>

      <div
        className='mb-5'
      >
        <InputGroup
          label='Search Listings'
          placeholder='Plot 123'
          type='text'
          className='rounded-[10px] bg-white px-7.5 py-4 shadow-1 dark:bg-gray-dark dark:shadow-card'
        />
      </div>

      <AllListingsTable
        data={response}
      />

      <div
        className='w-full mt-5'
      >
        <div
          className='flex flex-nowrap gap-3 items-center justify-center w-full'
        >
          <Button
            label='Prev'
            variant={"primary"}
            shape={"rounded"}
            className='bg-white !text-black dark:!text-white shadow-1 dark:bg-gray-dark dark:shadow-card'
          />
          <p
            className='text-black dark:text-white font-semibold'
          >1</p>
          <Button
            label='Next'
            variant={"primary"}
            shape={"rounded"}
            className='bg-white !text-black dark:!text-white shadow-1 dark:bg-gray-dark dark:shadow-card'
          />
        </div>
      </div>
    </div>
  )
}

export default AllListingsPage