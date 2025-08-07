import { Button } from "@/components/ui-elements/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { RiCheckboxCircleLine } from "@remixicon/react"
import Link from "next/link"

const SuccessMesage = ({
    onOpenChange,
    open,
}: {
    onOpenChange: (value: boolean) => void,
    open: boolean,
}) => {
    return (
        <Dialog
            onOpenChange={onOpenChange}
            open={open}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="flex items-center gap-3 text-primary text-xl"
                    >
                        <RiCheckboxCircleLine
                            size={20}
                        />
                        Listing Added
                    </DialogTitle>
                    <DialogDescription
                        className="text-lg"
                    >
                        You can add more listing more or navigate to listings page for more options.
                    </DialogDescription>
                    <div
                        className="flex gap-2"
                    >
                        <DialogClose
                            className="py-3 px-4 text-sm leading-4 rounded-md bg-primary/20 text-primary outline-none"
                        >
                            Add New
                        </DialogClose>

                        <Link
                            href={'/app/listings'}
                            className="py-3 px-4 text-sm leading-4 rounded-md bg-primary text-white"
                        >
                            View Listings
                        </Link>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SuccessMesage