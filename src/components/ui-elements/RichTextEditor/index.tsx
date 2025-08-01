'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import InputDropdownElement from '../InputDropdown';
import { RemixiconComponentType, RiBold, RiLinksLine } from '@remixicon/react';
import Link from "@tiptap/extension-link";
import { Dispatch, SetStateAction } from 'react';

export default function TiptapEditor({
    value,
    setValue,
}: {
    value: string,
    setValue: (html: string) => void,
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            setValue(editor.getHTML());
        },
        immediatelyRender: false,
    });

    return (
        <div className="border p-4 rounded">
            {/* Options */}
            <div
                className='flex items-end gap-3'
            >
                <InputDropdownElement
                    label='Element'
                    options={[
                        {
                            label: "Heading 1 (h1)",
                            value: "1",
                        },
                        {
                            label: "Heading 2 (h2)",
                            value: "2",
                        },
                        {
                            label: "Heading 3 (h3)",
                            value: "3",
                        },
                        {
                            label: "Heading 4 (h4)",
                            value: "4",
                        },
                        {
                            label: "Heading 5 (h5)",
                            value: "5",
                        },
                        {
                            label: "Heading 6 (h6)",
                            value: "6",
                        },
                        {
                            label: "Paragraph",
                            value: "p",
                        },
                    ]}
                    placeholder='Select Element'
                    valueOnChange={(value) => {
                        if (value === "p") {
                            editor?.chain().focus().setParagraph().run();
                        } else {
                            const headingValue = parseInt(value);
                            if (headingValue > 0 && headingValue <= 6) {
                                editor?.chain().focus().setHeading({ level: headingValue as any }).run();
                            }
                        }
                    }}
                />

            </div>

            {/* Content */

                editor ?
                    <EditorContent
                        editor={editor}
                        className='outline-none mt-5'
                    />
                    : <p
                        className='mt-3'
                    >Loading...</p>
            }
        </div>
    );
}
