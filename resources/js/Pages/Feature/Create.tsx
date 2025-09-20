import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, processing, errors, post } = useForm({
        name: '',
        description: ''
    });

    const createFeature: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('feature.store'), {
            preserveScroll: true
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Feature
                </h2>
            }
        >
            <Head title="Create New Feature" />

            <form onSubmit={createFeature} className="w-full">
                <div className="mb-8">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="mb-8">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextAreaInput
                        id="description"
                        rows={6}
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
