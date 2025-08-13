'use client';

import { base64ToFile } from '@/functions/common';
import { BufferFormatFileDataType } from '@/types/common-types';
import { RiDownloadLine, RiFile3Line } from '@remixicon/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CommentFile = ({ data }: {
    data: BufferFormatFileDataType,
}) => {

    const [file, setFile] = useState<File>();

    useEffect(() => {
        const file = base64ToFile(data.buffer, data.name, data.type);
        setFile(file);
    }, [])

    if (file) {
        return (
            <div
                className='inline-flex items-center gap-3 w-max mb-[15px] mr-[15px] border-2 rounded-md py-2 px-3'
            >
                <RiFile3Line
                    size={20}
                />
                <p>{file.name}</p>
                <Link
                    href={URL.createObjectURL(file)}
                    download={file.name}
                >
                    <RiDownloadLine
                        size={20}
                    />
                </Link>
            </div>
        )
    }
}

export default CommentFile