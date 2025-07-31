import { UserIcon } from '@/assets/icons'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button'
import { RiAtLine, RiLockLine } from '@remixicon/react'
import { Metadata } from 'next'
import React from 'react'
import InputDropdownElement from '@/components/ui-elements/InputDropdown'
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