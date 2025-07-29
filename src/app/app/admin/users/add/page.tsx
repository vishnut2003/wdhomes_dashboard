import { UserIcon } from '@/assets/icons'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button'
import { RiAtLine, RiLockLine } from '@remixicon/react'
import React from 'react'

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
          </ShowcaseSection>
        </div>
        <Button
          label='Add User'
          variant={"primary"}
          shape={"rounded"}
        />
      </div>
    </div>
  )
}

export default AddUsersPage