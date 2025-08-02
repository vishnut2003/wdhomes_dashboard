import { UploadIcon } from '@/assets/icons'
import { RiCloseCircleFill } from '@remixicon/react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef } from 'react'

const ImageGalleryUpload = ({
    images,
    setImages,
}: {
    setImages: Dispatch<SetStateAction<File[]>>,
    images: File[],
}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div
            className='space-y-5'
        >
            <button
                className='bg-primary text-white rounded-md py-3 px-4 flex items-center gap-3'
                onClick={() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }}
                type='button'
            >
                <UploadIcon />
                Upload Image Gallery
            </button>

            <input
                ref={fileInputRef}
                type='file'
                hidden
                accept='image/*'
                multiple
                onChange={(event) => {
                    const files = event.target.files;
                    for (const file of files || []) {
                        setImages(prev => [...prev, file])
                    }
                }}
            />

            <div
                className='flex flex-wrap gap-3'
            >
                {
                    images.map((image, index) => (
                        <div
                            className='relative max-w-max rounded-md'
                            key={index}
                        >
                            <Image
                                alt='Listing alt image'
                                src={URL.createObjectURL(image)}
                                width={500}
                                height={500}
                                objectFit='cover'
                                className='w-[100px] h-[100px] rounded-md'
                            />
                            <RiCloseCircleFill
                                size={25}
                                className='text-red absolute right-0 top-0 cursor-pointer bg-white rounded-full'
                                onClick={() => {
                                    setImages(prev => {
                                        const data = prev.filter((file, i) => index !== i)
                                        return data;
                                    })
                                }}
                            />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ImageGalleryUpload