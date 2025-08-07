'use client';

import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';


const ActionMenu = ({ listingId }: {
    listingId: string,
}) => {

    const router = useRouter();

    const [options] = useState<{
        label: string,
        value: string,
    }[]>([
        {
            label: "Edit",
            value: "edit",
        },
        {
            label: "Comments",
            value: "comments",
        },
        {
            label: "Delete",
            value: "delete",
        },
    ]);

    return (
        <Select
            onValueChange={(value) => {
                switch (value) {
                    case "edit":
                        router.push(`/app/listings/edit?id=${listingId}`);
                        break;

                    case "comments":
                        router.push(`/app/listings/comments?id=${listingId}`);
                        break;
                    
                    case "delete":
                        router.push(`/app/listings/delete?id=${listingId}`);
                        break;

                    default:
                        break;
                }
            }}
        >
            <SelectTrigger className="w-[180px]">
                Actions
            </SelectTrigger>
            <SelectContent>
                {
                    options.map((option, index) => (
                        <SelectItem
                            key={index}
                            value={option.value}
                        >{option.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}

export default ActionMenu