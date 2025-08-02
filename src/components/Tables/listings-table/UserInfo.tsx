import { generateRandomHexColor, hexToRgb } from '@/functions/common';
import { UserModelInterface } from '@/models/UserModel'
import React, { useEffect, useState } from 'react'

const UserTableUserInfo = ({ userData }: {
    userData: UserModelInterface,
}) => {

    const hexColor = generateRandomHexColor();
    const rgb = hexToRgb(hexColor);;

    return (
        <div
            className='flex items-center gap-3'
        >
            {
                rgb &&
                <div
                    className='w-[40px] h-[40px] rounded-full flex items-center justify-center'
                    style={{
                        backgroundColor: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : "",
                        color: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "",
                    }}
                >
                    {userData.nickname[0]}
                </div>
            }
            <div>
                <p
                    className='font-semibold'
                >{userData.username}</p>
                <p
                    className='text-xs'
                >{userData.role}</p>
            </div>
        </div>
    )
}

export default UserTableUserInfo