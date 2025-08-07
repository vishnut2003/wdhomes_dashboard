'use client';

import { Button } from '@/components/ui-elements/button'
import ErrorElement from '@/components/ui-elements/ErrorElement';
import { RiDeleteBinLine, RiLoaderLine } from '@remixicon/react';
import React, { useActionState, useEffect, useState } from 'react'
import { handleDeleteConfirm } from './handleDeleteAction';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ listingId }: {
    listingId: string,
}) => {

    const router = useRouter();
    const [data, action, isPending] = useActionState(handleDeleteConfirm, null);

    useEffect(() => {
        if (data?.success === true) {
            router.push('/app/listings');
        }   
    }, [data, router])

    return (
        <>
            <Button
                label='Confirm'
                shape={"rounded"}
                size={"small"}
                icon={
                    isPending ?
                        <RiLoaderLine
                            size={20}
                            className='animate-spin'
                        />
                        : <RiDeleteBinLine
                            size={20}
                        />
                }
                onClick={() => {
                    const formData = new FormData();
                    formData.append('listingId', listingId);
                    action(formData);
                }}
            />
            {
                data?.success === false &&
                <ErrorElement
                    message={data.message}
                />
            }
        </>
    )
}

export default DeleteButton