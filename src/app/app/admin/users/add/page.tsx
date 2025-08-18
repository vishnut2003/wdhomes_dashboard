import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'
import React from 'react'
import UserForm from './UserForm'

export const metadata: Metadata = {
  title: "Add Users",
};

const AddUsersPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Add Users" />
      <UserForm/>
    </div>
  )
}

export default AddUsersPage