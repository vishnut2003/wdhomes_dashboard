'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import InputDropdownElement from '../InputDropdown';
import { useEffect } from 'react';

export default function TiptapEditor({
    value,
    setValue,
    reset,
    disableUseEffect,
}: {
    value: string,
    setValue: (html: string) => void,
    reset: number,
    disableUseEffect?: boolean,
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

    useEffect(() => {

        if (disableUseEffect) {
            return;
        }

        editor?.commands.setContent('<p>Hello World!</p>');
    }, [reset, editor, disableUseEffect])

    return (
        <div className="border p-4 rounded">
            {/* Options */}
            <div
                className='flex items-end gap-3'
            >

                {
                    [
                        {
                            label: "h1",
                            value: "1",
                        },
                        {
                            label: "h2",
                            value: "2",
                        },
                        {
                            label: "h3",
                            value: "3",
                        },
                        {
                            label: "h4",
                            value: "4",
                        },
                        {
                            label: "h5",
                            value: "5",
                        },
                        {
                            label: "h6",
                            value: "6",
                        },
                        {
                            label: "Paragraph",
                            value: "p",
                        },
                    ].map((option, index) => (
                        <button
                            key={index}
                            type='button'
                            className='text-sm py-2 px-3 font-semibold rounded-md bg-dark-2 text-white dark:bg-white dark:text-dark-2'
                            onClick={() => {
                                if (option.value === "p") {
                                    editor?.chain().focus().setParagraph().run();
                                } else {
                                    const headingValue = parseInt(option.value);
                                    if (headingValue > 0 && headingValue <= 6) {
                                        editor?.chain().focus().setHeading({ level: headingValue as any }).run();
                                    }
                                }
                            }}
                        >
                            {option.label}
                        </button>
                    ))
                }

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
