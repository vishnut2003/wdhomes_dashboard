'use client';

import { base64ToFile } from '@/functions/common';
import { BufferFormatFileDataType } from '@/types/common-types';
import { RiDownloadLine, RiFile3Line } from '@remixicon/react';
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
                className='inline-flex items-center gap-3 w-max'
            >
                <RiFile3Line
                    size={20}
                />
                <p>{file.name}</p>
                <button>
                    <RiDownloadLine
                        size={15}
                    />
                </button>
            </div>
        )
    }
}

export default CommentFile