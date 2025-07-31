import { RiCheckboxCircleLine } from "@remixicon/react"

const SuccessElement = ({ message }: {
    message: string,
}) => {
    return (
        <div
            className="w-full flex items-center gap-3 bg-green/10 text-green py-3 px-4 rounded-md"
        >
            <RiCheckboxCircleLine
                size={20}
            />
            <p>{message}</p>
        </div>
    )
}

export default SuccessElement