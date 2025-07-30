import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@/lib/utils'

const InputDropdownElement = ({
    label,
    options,
    placeholder,
    className,
    valueOnChange,
}: {
    label: string,
    placeholder: string,
    options: {
        label: string,
        value: string,
    }[],
    className?: string,
    valueOnChange: (value: string) => void,
}) => {
    return (
        <div
            className={cn(
                className,
            )}
        >
            <label
                className="text-body-sm font-medium text-dark dark:text-white"
            >
                {label}
            </label>

            <Select
                onValueChange={valueOnChange}
            >
                <SelectTrigger className='w-full mt-3'>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent
                    className='bg-white shadow-1 dark:bg-gray-dark dark:shadow-card'
                >
                    {
                        options.map((option, i) => (
                            <SelectItem
                                value={option.value}
                                key={i}
                            >{option.label}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default InputDropdownElement