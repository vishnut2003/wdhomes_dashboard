'use client';

import { Button } from '@/components/ui-elements/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const UserTablePagination = ({ pageNumber, totalPages }: {
    pageNumber: number,
    totalPages: number,
}) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function handlePginationClick (type: "prev" | "next") {
        const newParams = new URLSearchParams(searchParams.toString());
        const targetPage = type === "prev" ? --pageNumber : ++pageNumber;

        newParams.set('page', `${targetPage}`);
        const targetUrl = `${pathname}?${newParams.toString()}`;
        router.push(targetUrl);
    }

    return (
        <div
            className='w-full mt-5'
        >
            <div
                className='flex flex-nowrap gap-3 items-center justify-center w-full'
            >
                <Button
                    label='Prev'
                    shape={"rounded"}
                    className='bg-white !text-black dark:!text-white shadow-1 dark:bg-gray-dark dark:shadow-card disabled:opacity-50'
                    disabled={pageNumber === 1}
                    onClick={() => handlePginationClick("prev")}
                />
                <p
                    className='text-black dark:text-white font-semibold'
                >{pageNumber}/{totalPages}</p>
                <Button
                    label='Next'
                    shape={"rounded"}
                    className='bg-white !text-black dark:!text-white shadow-1 dark:bg-gray-dark dark:shadow-card disabled:opacity-50'
                    disabled={pageNumber >= totalPages}
                    onClick={() => handlePginationClick("next")}
                />
            </div>
        </div>
    )
}

export default UserTablePagination