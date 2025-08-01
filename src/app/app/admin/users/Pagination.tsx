import { Button } from '@/components/ui-elements/button'
import React from 'react'

const UserTablePagination = ({ pageNumber, totalPages }: {
    pageNumber: number,
    totalPages: number,
}) => {
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
                />
                <p
                    className='text-black dark:text-white font-semibold'
                >{pageNumber}/{totalPages}</p>
                <Button
                    label='Next'
                    shape={"rounded"}
                    className='bg-white !text-black dark:!text-white shadow-1 dark:bg-gray-dark dark:shadow-card disabled:opacity-50'
                    disabled={pageNumber >= totalPages}
                />
            </div>
        </div>
    )
}

export default UserTablePagination