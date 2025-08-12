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
        <div>
            {
                user ?
                    <div
                        className='flex items-center justify-start'
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

            <div>
                <div
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                ></div>

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
        </div>
    )
}

export default CommentItem