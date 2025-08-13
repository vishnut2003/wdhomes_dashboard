'use client';

import { Button } from "@/components/ui-elements/button";
import ErrorElement from "@/components/ui-elements/ErrorElement";
import TiptapEditor from "@/components/ui-elements/RichTextEditor";
import { useActionState, useEffect, useState, startTransition } from "react";
import FileUploadForComment from "./FileUpload";
import { commentFormAction } from "./FormAction";
import { RiLoaderLine } from "@remixicon/react";
import SuccessElement from "@/components/ui-elements/SuccessElement";
import { useRouter } from "next/navigation";

const AddCommentForm = ({ listingId }: {
    listingId: string,
}) => {

    const router = useRouter();

    const [resetEditor, setResetEditor] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);

    const [state, formAction, isPending] = useActionState(commentFormAction, null);

    const [doReset, setDoReset] = useState<boolean>(false);

    useEffect(() => {

        if (state?.success === true && doReset) {
            setComment("");
            setFiles([]);
            setResetEditor(prev => ++prev);
            setDoReset(false);
            router.refresh();
        }

    }, [state, router, doReset])

    return (
        <form
            className="space-y-3"
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData();

                formData.append('comment', comment);
                formData.append('listingId', listingId);

                for (const file of files) {
                    formData.append('files', file);
                }

                setDoReset(true);

                startTransition(() => {
                    formAction(formData);
                })
            }}
        >
            <TiptapEditor
                reset={resetEditor}
                value={comment}
                setValue={(value) => {
                    setComment(value);
                }}
            />

            <FileUploadForComment
                files={files}
                setFiles={setFiles}
            />

            {
                state && !state.success && !isPending &&
                <ErrorElement
                    message={state.message}
                />
            }

            {
                state && state.success &&
                <SuccessElement
                    message={state.message}
                />
            }

            <Button
                type="submit"
                label="Upload Comment"
                shape={"rounded"}
                size={"small"}
                icon={
                    isPending &&
                    <RiLoaderLine
                        size={20}
                        className="animate-spin"
                    />
                }
                disabled={isPending}
            />
        </form>
    )
}

export default AddCommentForm