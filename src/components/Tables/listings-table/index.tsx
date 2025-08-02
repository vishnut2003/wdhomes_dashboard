import React from 'react'
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui-elements/button';
import { GetAllListingsDataResponse } from '@/functions/server/listingsHelpers/getAllListings';
import UserTableUserInfo from './UserInfo';
import ActionMenu from './ActionMenu';

const AllListingsTable = async ({ className, data }: {
    className?: string,
    data: GetAllListingsDataResponse,
}) => {

    return (
        <div
            className={cn(
                "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >

            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        <TableHead className="min-w-[120px] !text-left">Listing</TableHead>
                        <TableHead
                            className='!text-left'
                        >Status</TableHead>
                        <TableHead
                            className='!text-left'
                        >User</TableHead>
                        <TableHead
                            className='!text-left'
                        >City</TableHead>
                        <TableHead
                            className='!text-left'
                        >Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.data.map((listing, i) => (
                        <TableRow
                            className="text-center text-base font-medium text-dark dark:text-white"
                            key={listing.name + i}
                        >
                            <TableCell className="flex min-w-fit items-center gap-3">
                                <div
                                    className='text-left'
                                >
                                    <p
                                        className='text-base font-semibold'
                                    >{listing.name}</p>
                                    <p
                                        className='text-xs'
                                    >/new-homes-{listing.location.city}/{listing.slug}</p>
                                </div>
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                <span
                                    className={cn(
                                        "py-2 px-3 rounded-md",
                                        listing.status == "review" ? "bg-orange-500/20 text-orange-500"
                                            : listing.status == "pending" ? "bg-red-500/20 text-red-500"
                                                : listing.status == "publish" ? "bg-green-500/20 text-green-500" : ""
                                    )}
                                >{listing.status}</span>
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                {
                                    listing.userId && typeof listing.userId !== "string" &&
                                    <UserTableUserInfo
                                        userData={listing.userId}
                                    />
                                }
                            </TableCell>

                            <TableCell
                                className='text-left font-medium capitalize'
                            >{listing.location.city}</TableCell>

                            <TableCell
                                className='text-left'
                            >
                                <ActionMenu/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AllListingsTable