import FeatureItem from '@/Components/FeatureItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({ features }: { features: PaginatedData<Feature> }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature
                </h2>
            }
        >
            <Head title="Feature" />

            {features.data.map(feature => (
                <FeatureItem key={feature.id} feature={feature} />
            ))}
        </AuthenticatedLayout>
    );
}
