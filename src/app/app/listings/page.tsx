import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import AllListingsTable from '@/components/Tables/listings-table'
import { Button } from '@/components/ui-elements/button'
import React from 'react'

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
      <AllListingsTable />
    </div>
  )
}

export default AllListingsPage