import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup';
import AllUsersTable from '@/components/Tables/users-table'
import { Button } from '@/components/ui-elements/button'
import { UserRoleType } from '@/types/next-auth';
import { Metadata } from 'next';
import React from 'react'
import UsersFiltersElement from './Filters';
import UserTablePagination from './Pagination';
import { getAllUsers } from '@/functions/server/usersHelpers/getAllUsers';
import Link from 'next/link';
import { RiAddLine } from '@remixicon/react';

export const metadata: Metadata = {
  title: "All Users",
};

type Props = {
  searchParams: Promise<{
    search?: string,
    role?: UserRoleType,
    page?: string,
  }>
}

const AllUsersPage = async ({ searchParams }: Props) => {

  const queries = await searchParams;

  let pageNumber: string | number = queries.page || '1';
  pageNumber = parseInt(pageNumber);

  const search = queries.search
  const role = queries.role;

  const data = await getAllUsers({
    pageNumber,
    role,
    search,
  });

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="All Users" />
      <Link
        className='flex items-center gap-3 py-3 px-4 rounded-[10px] bg-primary text-white w-max mb-3'
        href={'/app/admin/users/add'}
      >
        <RiAddLine
          size={20}
        />
        Add User
      </Link>

      <UsersFiltersElement />

      <AllUsersTable
        data={data}
      />

      <p
        className='text-center font-semibold mt-3'
      >{data.totalRecords} Results</p>

      <UserTablePagination
        pageNumber={data.currentPage}
        totalPages={data.totalPages}
      />
    </div>
  )
}

export default AllUsersPage