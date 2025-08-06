'use client';

import InputGroup from '@/components/FormElements/InputGroup'
import { Button } from '@/components/ui-elements/button';
import InputDropdownElement from '@/components/ui-elements/InputDropdown'
import { ListingsStatusType } from '@/models/ListingModel';
import { UserRoleType } from '@/types/next-auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'

const ListingsFilterElement = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<ListingsStatusType | null>(null);

    useEffect(() => {
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        setStatus(status as ListingsStatusType | null);
        setSearch(search || "")
    }, [searchParams])

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        const newParams = new URLSearchParams(searchParams.toString());
        if (search) {
            newParams.set('search', search);
        } else {
            newParams.delete('search');
        }

        if (status) {
            newParams.set('status', status);
        } else {
            newParams.delete('status');
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
                placeholder='Name/Slug/Location'
                type='text'
                className='w-full'
                value={search}
                handleChange={(event) => setSearch(event.target.value)}
            />

            <InputDropdownElement
                label='Select Listing Status'
                options={[
                    {
                        label: "Review",
                        value: "review",
                    },
                    {
                        label: "Pending",
                        value: "pending",
                    },
                    {
                        label: "Publish",
                        value: "publish",
                    },
                    {
                        label: "All",
                        value: "all",
                    },
                ]}
                placeholder='Review/Pending/Publish'
                valueOnChange={(value) => {
                    setStatus(() => {
                        if (value === "all") {
                            return null;
                        } else {
                            return value as ListingsStatusType
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

export default ListingsFilterElement