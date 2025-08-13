import { generateRandomHexColor, hexToRgb } from '@/functions/common';
import { ListingCommentsModelInterface } from '@/models/ListingCommentsModel';
import { UserModelInterface } from '@/models/UserModel'
import { BufferFormatFileDataType } from '@/types/common-types';
import React from 'react'
import CommentFile from './Files';
import { CommentItemDataType } from '.';

const CommentItem = ({
    user,
    comment,
    files,
}: CommentItemDataType) => {

    const hexColor = generateRandomHexColor();
    const { r, g, b } = hexToRgb(hexColor);

    return (
        <div
            className='space-y-3'
        >
            {
                user ?
                    <div
                        className='flex items-center justify-start gap-3'
                    >
                        <div
                            className="min-w-[45px] min-h-[45px] font-semibold text-sm flex items-center justify-center rounded-full"
                            style={{
                                backgroundColor: `rgb(${r}, ${g}, ${b}, 0.2)`,
                                color: `rgb(${r}, ${g}, ${b})`,
                            }}
                        >
                            {user.nickname?.[0]}
                        </div>
                        <div>
                            <p
                                className='text-base font-semibold'
                            >{user.fullname}</p>
                            <p
                                className='text-sm'
                            >{user.email}</p>
                        </div>
                    </div>
                    : <p>Super Admin</p>
            }

            <div
                className='bg-white dark:bg-dark py-3 px-4 rounded-md'
            >
                <div
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                    className='listing-comment-text-content'
                ></div>

                {
                    files.length > 0 &&
                    <div
                        className='py-4 px-5 bg-gray-2 dark:bg-dark-2 rounded-md space-y-3'
                    >
                        <h2
                            className='text-lg font-semibold'
                        >Attachments</h2>
                        <div>
                            {
                                files.map((file, index) => (
                                    <CommentFile
                                        key={index}
                                        data={file}
                                    />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentItem