'use client';

import InputGroup from '@/components/FormElements/InputGroup'
import { Button } from '@/components/ui-elements/button';
import InputDropdownElement from '@/components/ui-elements/InputDropdown'
import { UserRoleType } from '@/types/next-auth';
import { RiLoaderLine } from '@remixicon/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'

const UsersFiltersElement = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [search, setSearch] = useState<string>('');
    const [userRole, setUserRole] = useState<UserRoleType | null>(null);

    useEffect(() => {
        const role = searchParams.get('role');
        const search = searchParams.get('search');
        setUserRole(role as UserRoleType | null);
        setSearch(search || "")
    }, [searchParams])

    function handleFormSubmit (event: FormEvent) {
        event.preventDefault();
        const newParams = new URLSearchParams(searchParams.toString());
        if (search) {
            newParams.set('search', search);
        } else {
            newParams.delete('search');
        }

        if (userRole) {
            newParams.set('role', userRole);
        } else {
            newParams.delete('role');
        }

        const newUrl = `${pathname}?${newParams.toString()}`;
        router.push(newUrl);
    }

    return (
        <form
            className='mb-5 rounded-[10px] bg-white px-7.5 py-4 shadow-1 dark:bg-gray-dark dark:shadow-card gap-5 flex flex-col md:flex-row items-end'
            onSubmit={handleFormSubmit}
        >
            <InputGroup
                label='Search User'
                placeholder='Name/Email/Username'
                type='text'
                className='w-full'
                value={search}
                handleChange={(event) => setSearch(event.target.value)}
            />

            <InputDropdownElement
                label='Select User Role'
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
                    },
                    {
                        label: "All",
                        value: "all",
                    },
                ]}
                placeholder='Manager/Client/Executive'
                valueOnChange={(value) => {
                    setUserRole(() => {
                        if (value === "all") {
                            return null;
                        } else {
                            return value as UserRoleType
                        }
                    })
                }}
                className='w-full'
            />
            <Button
                label='Filter'
                shape={"rounded"}
            />
        </form>
    )
}

export default UsersFiltersElement