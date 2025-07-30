import { UserIcon } from '@/assets/icons'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button'
import { RiAtLine, RiLockLine } from '@remixicon/react'
import { Metadata } from 'next'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputDropdownElement from '@/components/ui-elements/InputDropdown'

export const metadata: Metadata = {
  title: "Add Users",
};

const AddUsersPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Add Users" />

      <div className="w-full space-y-5">
        <div>
          <ShowcaseSection
            title='User Information'
            className='space-y-3'
          >
            <InputGroup
              className="w-full"
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="David Jhon"
              icon={<UserIcon />}
              iconPosition="left"
              height="sm"
            />
            <InputGroup
              className="w-full"
              type="text"
              name="username"
              label="Username"
              placeholder="david_jhon"
              icon={<UserIcon />}
              iconPosition="left"
              height="sm"
            />
            <InputGroup
              className="w-full"
              type="text"
              name="nickname"
              label="Nickname"
              placeholder="david"
              icon={<UserIcon />}
              iconPosition="left"
              height="sm"
            />
            <InputGroup
              className="w-full"
              type="email"
              name="email"
              label="Email"
              placeholder="david@email.com"
              icon={<RiAtLine />}
              iconPosition="left"
              height="sm"
            />
            <InputGroup
              className="w-full"
              type="password"
              name="password"
              label="password"
              placeholder="password"
              icon={<RiLockLine />}
              iconPosition="left"
              height="sm"
            />

            <InputDropdownElement
              label='Select User Role'
              placeholder='Role'
              valueOnChange={() => {}}
              options={[
                {
                  label: "Manager",
                  value: "manager",
                },
                {
                  label: "Member",
                  value: "member",
                },
                {
                  label: "Client",
                  value: "client",
                }
              ]}
            />

          </ShowcaseSection>
        </div>
        <div
          className='flex justify-end'
        >
          <Button
            label='Add User'
            variant={"primary"}
            shape={"rounded"}
          />
        </div>
      </div>
    </div>
  )
}

export default AddUsersPage