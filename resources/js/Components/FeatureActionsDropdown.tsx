import Dropdown from '@/Components/Dropdown';
import { Feature } from '@/types';
import { can } from "@/helpers";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from 'react';
import ConfirmDelete from './ComfirmDelete';

export default function FeatureActionsDropdown({ feature, flash }: { feature: Feature; flash: () => void }) {
  const user = usePage().props.auth.user;
  
  const [confirmingFeature, setConfirmingFeature] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null);

  const { delete: destroy, processing } = useForm();

  const openDeleteModal = (feature: Feature) => {
    setFeatureToDelete(feature);
    setConfirmingFeature(true);
  };

  const closeDeleteModal = () => {
    setFeatureToDelete(null);
    setConfirmingFeature(false);
  };

  const deleteFeature = () => {
    if (!featureToDelete) return;

    destroy(route("feature.destroy", featureToDelete.id), {
      onSuccess: () => {
        closeDeleteModal();
        flash();
      },
    });
  };

  if (!can(user, 'manage_features')) {
        return;
    }

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd"
                  d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clipRule="evenodd" />
              </svg>
            </button>
          </span>
        </Dropdown.Trigger>

        <Dropdown.Content width='28'>
          <Dropdown.Link
                    prefetch
                    href={route('feature.edit', feature.id)}
                >
                    Edit
                </Dropdown.Link>
          <Dropdown.Link 
                as="button" 
                onClick={(e) => {
                    e.preventDefault();
                    openDeleteModal(feature);
                }}
            >
                Delete
          </Dropdown.Link>
        </Dropdown.Content>
      </Dropdown>

      <ConfirmDelete
        show={confirmingFeature}
        onClose={closeDeleteModal}
        onDelete={deleteFeature}
        processing={processing}
        itemName="feature"
      />
    </>
  )
}
