import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import React from 'react'
import { Button } from '@/components/ui-elements/button';
import { generateRandomHexColor, hexToRgb } from '@/functions/common';
import { GetAllUsersDataResponse } from '@/functions/server/usersHelpers/getAllUsers';

const AllUsersTable = async ({ className, data }: {
    className?: string,
    data: GetAllUsersDataResponse,
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
                    {data.data.map((user, i) => {

                        const hexColor = generateRandomHexColor();
                        const { r, g, b } = hexToRgb(hexColor);

                        return (
                            <TableRow
                                className="text-center text-base font-medium text-dark dark:text-white"
                                key={user.nickname + i}
                            >
                                <TableCell className="flex min-w-fit items-center gap-3">
                                    <div
                                        className="min-w-[45px] min-h-[45px] font-semibold text-sm flex items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: `rgb(${r}, ${g}, ${b}, 0.2)`,
                                            color: `rgb(${r}, ${g}, ${b})`,
                                        }}
                                    >
                                        {user.nickname?.[0]}
                                    </div>
                                    <div>{user.fullname}</div>
                                </TableCell>

                                <TableCell
                                    className='text-left'
                                >
                                    <p>{user.username}</p>
                                    <p
                                        className='text-xs line-clamp-1 max-w-full'
                                    >{user.email}</p>
                                </TableCell>

                                <TableCell
                                    className='text-left'
                                >
                                    {user.nickname}
                                </TableCell>

                                <TableCell
                                    className='text-left capitalize'
                                >{user.role}</TableCell>

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
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default AllUsersTable