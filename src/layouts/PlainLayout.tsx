import React, { ReactNode } from 'react'

const PlainLayout = ({
    children
}: {
    children: ReactNode,
}) => {
    return (
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
        </main>
    )
}

export default PlainLayout