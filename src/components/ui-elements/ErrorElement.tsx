import { RiErrorWarningLine } from "@remixicon/react"

const ErrorElement = ({ message }: {
    message: string,
}) => {
    return (
        <div
            className="w-full flex items-center gap-3 bg-red/10 text-red py-3 px-4 rounded-md"
        >
            <RiErrorWarningLine
                size={20}
            />
            <p>{message}</p>
        </div>
    )
}

export default ErrorElement