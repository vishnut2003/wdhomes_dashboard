import React from 'react'
import { getAllListings } from '../fetch';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui-elements/button';

const AllListingsTable = async ({ className }: {
    className?: string,
}) => {
    const data = await getAllListings();

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
                        >City</TableHead>
                        <TableHead
                            className='!text-left'
                        >State</TableHead>
                        <TableHead
                            className='!text-right'
                        >Start from</TableHead>
                        <TableHead
                            className='!text-left'
                        >Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((channel, i) => (
                        <TableRow
                            className="text-center text-base font-medium text-dark dark:text-white"
                            key={channel.name + i}
                        >
                            <TableCell className="flex min-w-fit items-center gap-3">
                                {channel.name}
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                <p>{channel.city}</p>
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                {channel.state}
                            </TableCell>

                            <TableCell
                                className='text-right font-medium text-green-600'
                            >&#8377; {channel.startFrom}</TableCell>

                            <TableCell
                                className='text-left'
                            >
                                <Button
                                    label='Edit'
                                    variant={"primary"}
                                    size={"small"}
                                    shape={"rounded"}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AllListingsTable