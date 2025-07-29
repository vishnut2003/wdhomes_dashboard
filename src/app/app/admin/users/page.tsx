import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import AllUsersTable from '@/components/Tables/users-table'
import { Button } from '@/components/ui-elements/button'
import React from 'react'

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
      <AllUsersTable/>
    </div>
  )
}

export default AllUsersPage