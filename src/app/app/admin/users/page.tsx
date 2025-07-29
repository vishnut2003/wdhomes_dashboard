import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import AllUsersTable from '@/components/Tables/users-table'
import { Button } from '@/components/ui-elements/button'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "All Users",
};

const AllUsersPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="All Users" />
      <Button
        label='Add Users'
        shape={"rounded"}
        className='my-5'
        size={"small"}
      />
      <AllUsersTable />
    </div>
  )
}

export default AllUsersPage