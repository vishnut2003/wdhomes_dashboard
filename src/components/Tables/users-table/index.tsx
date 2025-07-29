import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import React from 'react'
import { getAllUsers } from '../fetch';
import Image from 'next/image';
import { Button } from '@/components/ui-elements/button';

const AllUsersTable = async ({ className }: {
    className?: string,
}) => {

    const data = await getAllUsers();

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
                        <TableHead className="min-w-[120px] !text-left">Fullname</TableHead>
                        <TableHead
                            className='!text-left'
                        >Username</TableHead>
                        <TableHead
                            className='!text-left'
                        >Nickname</TableHead>
                        <TableHead
                            className='!text-left'
                        >Role</TableHead>
                        <TableHead
                            className='!text-left'
                        >Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((channel, i) => (
                        <TableRow
                            className="text-center text-base font-medium text-dark dark:text-white"
                            key={channel.nickName + i}
                        >
                            <TableCell className="flex min-w-fit items-center gap-3">
                                <Image
                                    src={channel.image}
                                    className="size-8 rounded-full object-cover"
                                    width={40}
                                    height={40}
                                    alt={channel.nickName + " Logo"}
                                    role="presentation"
                                />
                                <div className="">{channel.fullname}</div>
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                <p>{channel.username}</p>
                                <p
                                    className='text-xs line-clamp-1 max-w-full'
                                >{channel.email}</p>
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >
                                {channel.nickName}
                            </TableCell>

                            <TableCell
                                className='text-left'
                            >{channel.role}</TableCell>

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

export default AllUsersTable