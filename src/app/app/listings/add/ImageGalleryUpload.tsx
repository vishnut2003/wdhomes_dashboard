import { UploadIcon } from '@/assets/icons'
import { RiCloseCircleFill } from '@remixicon/react'
import Image from 'next/image'
import React from 'react'

const ImageGalleryUpload = () => {
    return (
        <div
            className='space-y-5'
        >
            <button
                className='bg-primary text-white rounded-md py-3 px-4 flex items-center gap-3'
            >
                <UploadIcon />
                Upload Image Gallery
            </button>

            <div
                className='flex flex-wrap gap-3'
            >
                <div
                    className='relative max-w-max rounded-md'
                >
                    <Image
                        alt='Listing alt image'
                        src={'/images/product/product-01.png'}
                        width={500}
                        height={500}
                        objectFit='cover'
                        className='w-[100px] h-[100px]'
                    />
                    <RiCloseCircleFill
                        size={25}
                        className='text-red absolute right-0 top-0 cursor-pointer'
                    />
                </div>
                
                <div
                    className='relative max-w-max rounded-md'
                >
                    <Image
                        alt='Listing alt image'
                        src={'/images/product/product-01.png'}
                        width={500}
                        height={500}
                        objectFit='cover'
                        className='w-[100px] h-[100px]'
                    />
                    <RiCloseCircleFill
                        size={25}
                        className='text-red absolute right-0 top-0 cursor-pointer'
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageGalleryUpload