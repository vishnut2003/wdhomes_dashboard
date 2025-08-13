'use client';

import { RiCloseLargeLine } from "@remixicon/react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

const FileUploadForComment = ({
    files,
    setFiles
}: {
    setFiles: Dispatch<SetStateAction<File[]>>,
    files: File[],
}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files;

        const files: File[] = []
        for (const file of fileList || []) {
            files.push(file);
        }

        setFiles(files);

    }

    return (
        <div>
            <button
                className="text-sm py-2 px-4 border border-dark-3 rounded-md bg-dark-2 text-white dark:bg-white dark:text-dark-2"
                type="button"
                onClick={() => {
                    if (inputRef) {
                        inputRef.current?.click();
                    }
                }}
            >
                Choose Files
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="*"
                name="attachments"
                multiple
                onChange={handleInputChange}
                hidden
            />

            <div
                className="pt-[20px]"
            >
                {
                    files.map((file, index) => (
                        <span
                            className="inline-flex items-center gap-3 mr-[20px] mb-[20px] bg-gray dark:bg-dark-2 py-2 px-3"
                            key={index}
                        >
                            {file.name}
                            <RiCloseLargeLine
                                size={20}
                                className="cursor-pointer"
                                onClick={() => {
                                    setFiles(prev => {
                                        const prevCopy = [...prev];
                                        prevCopy.splice(index, 1)
                                        return [...prevCopy];
                                    })
                                }}
                            />
                        </span>
                    ))
                }
            </div>

        </div>
    )
}

export default FileUploadForComment