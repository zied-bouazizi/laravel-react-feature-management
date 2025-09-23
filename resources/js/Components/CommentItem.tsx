import { can } from "@/helpers";
import { Comment } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import TimeAgo from "./TimeAgo";
import { useState } from "react";
import TextAreaInput from "./TextAreaInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function CommentItem({ comment }: { comment: Comment }) {
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState(false);

    const deleteForm = useForm();
    const editForm = useForm({
        comment: comment.comment,
    });
    
    const { processing } = editForm;

    const isInvalid = editForm.data.comment.trim().length === 0 || editForm.data.comment.length > 2000;


    const deleteComment = () => {
        deleteForm.delete(route('comment.destroy', comment.id), {
            preserveScroll: true,
            preserveState: true
        })
    }

    const updateComment = () => {
        editForm.put(route('comment.update', comment.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setIsEditing(false),
        });
    };


    return (
        <div className="flex gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>
            <div className="flex-1">
                <h3 className="font-bold mt-1">
                    {comment.user.name}
                    <TimeAgo timestamp={comment.created_at} className="text-gray-500 text-xs ml-4" />
                    {comment.updated_at !== comment.created_at && (
                        <span className="text-gray-500 text-xs ml-1">(Edited)</span>
                    )}
                </h3>
                {!isEditing ? (
                    <div className="italic mt-1">
                        {comment.comment}
                    </div>
                ) : (
                    <div className="mt-2">
                        <TextAreaInput
                            rows={1}
                            value={editForm.data.comment}
                             onChange={(e) =>
                                editForm.setData('comment', e.target.value)
                            }
                            className="w-full rounded-md border-gray-300 text-sm"
                        ></TextAreaInput>

                        <p
                            className={`text-xs mt-1 ${
                                editForm.data.comment.length > 2000
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            {editForm.data.comment.length}/2000
                        </p>

                        <div className="flex gap-2 mt-2">
                            <PrimaryButton 
                                size="sm"
                                onClick={updateComment}
                                disabled={processing || isInvalid}
                            >
                                Save
                            </PrimaryButton>
                            <SecondaryButton
                                size="sm"
                                onClick={() => {
                                    setIsEditing(false);
                                    editForm.reset();
                                }}
                            >
                                Cancel
                            </SecondaryButton>
                        </div>
                    </div>
                )}
            </div>
            {can(user, 'manage_comments') && comment.user.id == user.id &&
                <div className="flex items-start gap-3 py-2 px-6">
                    <button onClick={() => setIsEditing(true)} disabled={processing}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213
                                a1.5 1.5 0 0 1-.684.39l-3 1
                                1-3a1.5 1.5 0 0 1 .39-.684
                                L16.862 4.487Z" />
                        </svg>
                    </button>

                    <button onClick={deleteComment}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            }
        </div>
    );
}