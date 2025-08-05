'use client';

import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';


const ActionMenu = ({ listingSlug }: {
    listingSlug: string,
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
            label: "Updates",
            value: "updates",
        },
    ]);

    return (
        <Select
            onValueChange={(value) => {
                switch (value) {
                    case "edit":
                        router.push(`/app/listings/edit?slug=${listingSlug}`);
                        break;
                        
                        case "update":
                        router.push(`/app/listings/updates?slug=${listingSlug}`);
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