import CommentItem from '@/Components/CommentItem';
import FeatureUpvoteDownvote from '@/Components/FeatureUpvoteDownvote';
import NewCommentForm from '@/Components/NewCommentForm';
import { can } from '@/helpers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature, Comment, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, feature, comments }: PageProps<{
    feature: Feature; comments: Comment[]
}>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Feature <b>"{feature.name}"</b>
                    </h2>

                    {can(auth.user, 'manage_features') && (
                        <Link 
                            prefetch
                            href={route('feature.edit', feature.id)}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 whitespace-nowrap"
                        >
                            Edit Feature
                        </Link>
                    )}
                </div>
            }
        >
            <Head title={`Feature "${feature.name}"`} />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <FeatureUpvoteDownvote feature={feature} />
                    <div className="flex-1">
                        <h2 className="text-2xl mb-2">{feature.name}</h2>
                        <p>{feature.description}</p>
                        {comments &&
                            <div className="mt-8">
                                <NewCommentForm feature={feature} />
                                {comments.map(comment => (
                                    <CommentItem comment={comment} key={comment.id} />
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
