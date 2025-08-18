import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';
import React from 'react'
import UserEditForm from './EditForm';
import { notFound } from 'next/navigation';
import { getOneUserByUserId } from '@/functions/server/usersHelpers/getOneByUserid';
import { UserRoleType } from '@/types/next-auth';

export const metadata: Metadata = {
    title: "Edit Users",
};

type Props = {
    searchParams: Promise<{
        id?: string,
    }>
}

const EditUsersPage = async ({
    searchParams,
}: Props) => {

    const userId = (await searchParams).id;

    if (!userId) {
        notFound();
    }

    const user = await getOneUserByUserId({ userId });

    if (!user) {
        notFound();
    }

    return (
        <div className="mx-auto w-full max-w-[1080px]">
            <Breadcrumb pageName="Edit Users" />
            <UserEditForm
                userData={{
                    fullname: user.fullname,
                    email: user.email,
                    nickname: user.nickname,
                    password: "",
                    role: user.role as UserRoleType,
                    username: user.username,
                }}
                userId={user.userId}
            />
        </div>
    )
}

export default EditUsersPage