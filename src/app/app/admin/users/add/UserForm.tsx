'use client';

import { UserIcon } from '@/assets/icons'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button'
import InputDropdownElement from '@/components/ui-elements/InputDropdown'
import { RiAtLine, RiLockLine } from '@remixicon/react'
import React from 'react'

const UserForm = () => {
    return (
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
                        valueOnChange={() => { }}
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
    )
}

export default UserForm