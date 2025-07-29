import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import AllListingsTable from '@/components/Tables/listings-table'
import { Button } from '@/components/ui-elements/button'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "All Listings",
}

const AllListingsPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="All Listings" />
      <Button
        label='Add Listings'
        shape={"rounded"}
        className='my-5'
        size={"small"}
      />

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

      <AllListingsTable />

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