'use client';

import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button';
import InputDropdownElement from '@/components/ui-elements/InputDropdown'
import { cn } from '@/lib/utils';
import { ListingsStatusType } from '@/models/ListingModel'
import React, { useActionState, useState } from 'react'
import { handleStatusUpdate } from './handleSubmit';
import { RiLoaderLine } from '@remixicon/react';
import { handleCatchBlock } from '@/functions/common';
import SuccessElement from '@/components/ui-elements/SuccessElement';
import ErrorElement from '@/components/ui-elements/ErrorElement';
import { useRouter } from 'next/navigation';

const UpdateListingStatusElement = ({
    activeStatus,
    listingId,
}: {
    listingId: string,
    activeStatus: ListingsStatusType,
}) => {

    const router = useRouter();

    const statusOptions: ListingsStatusType[] = ["pending", "publish", "review"]
    const [status, setStatus] = useState<ListingsStatusType>(activeStatus);

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const SectionTitle = () => (
        <p>
            Status:
            <span
                className={cn(
                    'py-[6px] px-[10px] rounded-md text-sm capitalize ml-[15px]',
                    `${activeStatus === "publish" ? "bg-green/20 text-green" : activeStatus === "review" ? "bg-orange-500/20 text-orange-500" : "bg-red/20 text-red"}`
                )}
            >{activeStatus}</span>
        </p>
    )

    return (
        <ShowcaseSection
            title={<SectionTitle />}
            className='space-y-5'
        >
            <InputDropdownElement
                label="Listing Status"
                placeholder={activeStatus}
                className='capitalize'
                options={statusOptions.map((status) => ({
                    label: status,
                    value: status,
                }))}
                valueOnChange={(value) => {
                    setStatus(value as ListingsStatusType)
                }}
            />
            <Button
                label='Save Status'
                shape={"rounded"}
                size={"small"}
                onClick={async () => {
                    setInProgress(true);
                    setError(null);

                    try {
                        await handleStatusUpdate({
                            listingId,
                            status,
                        })

                        setSuccess(true)
                        setTimeout(() => setSuccess(false), 5000);

                    } catch (err) {
                        const message = handleCatchBlock(err);
                        setError(message);
                    }

                    setInProgress(false);
                    router.refresh();

                }}
                icon={
                    inProgress &&
                    <RiLoaderLine
                        size={20}
                        className='animate-spin'
                    />
                }
            />

            {
                success &&
                <SuccessElement
                    message='Listing Status Updates.'
                />
            }

            {
                error &&
                <ErrorElement
                    message={error}
                />
            }

        </ShowcaseSection>
    )
}

export default UpdateListingStatusElement