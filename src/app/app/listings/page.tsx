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
import ListingsTablePagination from './Pagination'
import ListingsFilterElement from './Filters'

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

      <ListingsFilterElement/>

      <AllListingsTable
        data={response}
      />

      <p
        className='text-center font-semibold mt-3'
      >{response.totalRecords} Results</p>

      <ListingsTablePagination
        pageNumber={response.currentPage}
        totalPages={response.totalPages}
      />
    </div>
  )
}

export default AllListingsPage