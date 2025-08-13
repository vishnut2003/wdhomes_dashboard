
import { ListingCommentsModelInterface } from '@/models/ListingCommentsModel'
import { UserModelInterface } from '@/models/UserModel'
import React from 'react'
import CommentItem from './SingleItem'
import { BufferFormatFileDataType } from '@/types/common-types'
import { RiErrorWarningLine } from '@remixicon/react'

export interface CommentItemDataType {
    user: UserModelInterface | null,
    comment: ListingCommentsModelInterface,
    files: BufferFormatFileDataType[],
}

const Comments = ({ data }: {
    data: CommentItemDataType[],
}) => {

    if (data.length === 0) {
        return (
            <div
                className='flex items-center min-h-[300px] justify-center gap-3'
            >
                <RiErrorWarningLine
                    size={20}
                />
                <p>No Comments Yet...</p>
            </div>
        )
    }

    return (
        <div
            className='w-full'
        >
            <div
                className='space-y-[20px] px-[40px] py-[20px]'
            >
                <h2
                    className='text-xl font-semibold text-text-black dark:text-white'
                >Comments</h2>
                <div
                    className='space-y-6'
                >
                    {
                        data.map((item, index) => (
                            <CommentItem
                                key={index}
                                comment={item.comment}
                                files={item.files}
                                user={item.user}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Comments