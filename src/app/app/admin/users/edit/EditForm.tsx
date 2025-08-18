'use client';

import { UserIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import ErrorElement from "@/components/ui-elements/ErrorElement";
import InputDropdownElement from "@/components/ui-elements/InputDropdown";
import SuccessElement from "@/components/ui-elements/SuccessElement";
import { UserRoleType } from "@/types/next-auth";
import { RiAtLine, RiLoaderLine, RiLockLine } from "@remixicon/react";
import { ChangeEvent, useState } from "react";
import { handleEditUserFormSubmit } from "./handleFormSubmit";

interface UserFormFieldsInterface {
    username: string,
    email: string,
    fullname: string,
    nickname: string,
    password: string,
    role: UserRoleType,
}

const UserEditForm = ({
    userData,
    userId,
}: {
    userData: UserFormFieldsInterface,
    userId: string,
}) => {

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserFormFieldsInterface>(userData);

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <form
            className="w-full space-y-5"
            onSubmit={async (event) => {
                event.preventDefault();

                await handleEditUserFormSubmit({
                    setError,
                    setInProgress,
                    setSuccess,
                    userId,
                    userData: formData,
                })
            }}
        >
            <div>
                <ShowcaseSection
                    title='User Information'
                    className='space-y-3'
                >
                    <InputGroup
                        className="w-full"
                        type="text"
                        name="fullname"
                        label="Full Name"
                        placeholder="David Jhon"
                        icon={<UserIcon />}
                        iconPosition="left"
                        height="sm"
                        value={formData.fullname}
                        handleChange={handleInputOnChange}
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
                        value={formData.username}
                        handleChange={(event) => {
                            let value: string | string[] = event.target.value;
                            value = value.split(" ").join('_').toLowerCase();
                            setFormData(prev => ({
                                ...prev,
                                username: value,
                            }))
                        }}
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
                        value={formData.nickname}
                        handleChange={handleInputOnChange}
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
                        value={formData.email}
                        handleChange={handleInputOnChange}
                    />
                    <InputGroup
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="password"
                        placeholder="password"
                        icon={<RiLockLine />}
                        iconPosition="left"
                        height="sm"
                        value={formData.password}
                        handleChange={handleInputOnChange}
                    />

                    <div
                        className='flex items-center gap-3'
                    >
                        <input
                            type='checkbox'
                            id='show-password'
                            name='show-password'
                            onChange={(event) => setShowPassword(event.target.checked)}
                        />
                        <label
                            htmlFor="show-password"
                            className='font-medium text-black/60 dark:text-white'
                        >Show password</label>
                    </div>

                    <InputDropdownElement
                        label='Select User Role'
                        placeholder={formData.role}
                        valueOnChange={(value) => setFormData(prev => ({
                            ...prev,
                            role: value as UserRoleType
                        }))}
                        options={[
                            {
                                label: "Manager",
                                value: "manager",
                            },
                            {
                                label: "Executive",
                                value: "executive",
                            },
                            {
                                label: "Client",
                                value: "client",
                            }
                        ]}
                    />

                </ShowcaseSection>
            </div>

            {
                error &&
                <ErrorElement
                    message={error}
                />
            }

            {
                success &&
                <SuccessElement
                    message='Changes Saved'
                />
            }

            <div
                className='flex justify-end'
            >
                <Button
                    label={inProgress ? 'Loading...' : 'Save Changes'}
                    variant={"primary"}
                    shape={"rounded"}
                    disabled={inProgress}
                    className='disabled:opacity-60'
                    icon={inProgress && <RiLoaderLine className='animate-spin' />}
                />
            </div>
        </form>
    )
}

export default UserEditForm