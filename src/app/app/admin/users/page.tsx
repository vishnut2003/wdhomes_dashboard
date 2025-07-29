import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup';
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

      <div
        className='mb-5'
      >
        <InputGroup
          label='Search User'
          placeholder='john@email.com'
          type='email'
          className='rounded-[10px] bg-white px-7.5 py-4 shadow-1 dark:bg-gray-dark dark:shadow-card'
        />
      </div>

      <AllUsersTable />

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
            className='bg-white text-black dark:text-white shadow-1 dark:bg-gray-dark dark:shadow-card'
          />
          <p
            className='text-black dark:text-white font-semibold'
          >1</p>
          <Button
            label='Next'
            variant={"primary"}
            shape={"rounded"}
            className='bg-white text-black dark:text-white shadow-1 dark:bg-gray-dark dark:shadow-card'
          />
        </div>
      </div>
    </div>
  )
}

export default AllUsersPage