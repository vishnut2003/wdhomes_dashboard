import { ReactNode } from "react"

const DefaultLayout = ({ children }: Readonly<{
    children: ReactNode,
}>) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <div
                    className="flex items-center justify-center h-[100dvh] p-5"
                >
                    <div
                        className="w-full max-w-screen-lg"
                    >
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}

export default DefaultLayout