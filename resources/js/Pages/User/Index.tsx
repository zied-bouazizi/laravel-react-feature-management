import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { User, PageProps, PaginatedData } from "@/types";
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import Pagination from '@/Components/Pagination';

export default function Index({ users, roleLabels, queryParams = null }: PageProps<{ users: PaginatedData<User>, roleLabels: Record<string, string>; queryParams?: Record<string, string> | null }>) {
    queryParams = queryParams || {};

    const sortDirection = 
    queryParams.sort_direction === "asc" || queryParams.sort_direction === "desc"
        ? queryParams.sort_direction
        : null;

    const searchFieldChanged = (name: string, value: string) => {
         if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
    };

    const handleEnterKey = (
        name: string,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
        searchFieldChanged(name, e.currentTarget.value);
    }
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "desc";
        }
        router.get(route("user.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeading
                                        name="id"
                                        sort_field={queryParams.sort_field || null}
                                        sort_direction={sortDirection}
                                        sortChanged={sortChanged}
                                    >
                                        ID
                                    </TableHeading>
                                    <TableHeading
                                        name="name"
                                        sort_field={queryParams.sort_field || null}
                                        sort_direction={sortDirection}
                                        sortChanged={sortChanged}
                                    >
                                        Name
                                    </TableHeading>
                                    <TableHeading
                                        name="email"
                                        sort_field={queryParams.sort_field || null}
                                        sort_direction={sortDirection}
                                        sortChanged={sortChanged}
                                    >
                                        Email
                                    </TableHeading>
                                    <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field || null}
                                        sort_direction={sortDirection}
                                        sortChanged={sortChanged}
                                    >
                                        Created At
                                    </TableHeading>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-6 py-4"></th>
                                <th className="px-6 py-4 min-w-[150px]">
                                    <TextInput
                                        className="w-full"
                                        defaultValue={queryParams.name}
                                        placeholder="User Name"
                                        onBlur={(e) => searchFieldChanged("name", e.target.value)}
                                        onKeyDown={(e) => handleEnterKey("name", e)}
                                    />
                                </th>
                                <th className="px-6 py-4 min-w-[250px]">
                                    <TextInput
                                        defaultValue={queryParams.email}
                                        className="w-full"
                                        placeholder="User Email"
                                        onBlur={(e) => searchFieldChanged("email", e.target.value)}
                                        onKeyDown={(e) => handleEnterKey("email", e)}
                                    />
                                </th>
                                <th className="px-6 py-4"></th>
                                <th className="px-6 py-4"></th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                            <tbody>
                                {users.data.length === 0 && (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4" colSpan={6}>
                                            <p className="text-center">No users found</p>
                                        </td>
                                    </tr>
                                )}

                                {users.data.map(user => (<tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {user.id}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.created_at}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.roles.map((role: string) => roleLabels[role]).join(', ')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link prefetch href={route('user.edit', user.id)} className="text-blue-500">
                                            Edit Role
                                        </Link>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={users.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}