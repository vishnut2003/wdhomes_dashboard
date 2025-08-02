'use client';

import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown'
import React, { useState } from 'react'

const ActionMenu = () => {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <DropdownTrigger>Open</DropdownTrigger>
            <DropdownContent>
                Test
            </DropdownContent>
        </Dropdown>
    )
}

export default ActionMenu