import { Feature } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { can } from "@/helpers";

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        post,
        processing
    } = useForm({
        comment: ''
    })

    const isInvalid = data.comment.trim().length === 0 || data.comment.length > 2000;

    const createComment: FormEventHandler = (ev) => {
        ev.preventDefault();

        post(route('comment.store', feature.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData('comment', '')
        })
    }

    if (!can(user, 'manage_comments')) {
        return (
            <div className="text-center text-gray-600">
                You don't have permission to leave comments
            </div>
        );
    }

    return (
        <>
            <form onSubmit={createComment} className="flex items-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <TextAreaInput
                    rows={1}
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="Write a comment..."
                ></TextAreaInput>
                <PrimaryButton disabled={processing || isInvalid}>Comment</PrimaryButton>
            </form>
            <p
                className={`text-xs mb-4 ${
                    data.comment.length > 2000
                        ? 'text-red-600'
                        : 'text-gray-500'
                }`}
            >
                {data.comment.length}/2000
            </p>
        </>
    );
}