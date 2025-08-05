'use client';

import { RiLoaderLine } from "@remixicon/react";

const LoadingElement = ({ message }: {
    message: string,
}) => {
    return (
        <div>
            <div
                className="flex items-center gap-4"
            >
                <RiLoaderLine
                    size={30}
                    className="animate-spin text-primary"
                />
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LoadingElement