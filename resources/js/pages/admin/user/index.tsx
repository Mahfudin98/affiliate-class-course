import { Head, router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
    RowActions,
    SortButton,
    StatusBadge,
} from '@/components/datatable/component-helper';
import { DataTable } from '@/components/datatable/data-tables';
import { Card, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import { create, destroy, edit, show } from '@/routes/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/users',
    },
];

export default function UserIndex({ users }: { users: User[] }) {
    // Definisi kolom
    const columns: ColumnDef<User>[] = [
        // Checkbox select all
        {
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) =>
                        table.toggleAllPageRowsSelected(e.target.checked)
                    }
                    className="accent-primary"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(e.target.checked)}
                    className="accent-primary"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        },

        // Kolom ID
        {
            accessorKey: 'id',
            header: ({ column }) => <SortButton column={column}>#</SortButton>,
            cell: ({ row }) => (
                <span className="font-mono text-xs text-muted-foreground">
                    #{String(row.getValue('id')).padStart(4, '0')}
                </span>
            ),
        },

        // Kolom Nama
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <SortButton column={column}>Nama</SortButton>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary uppercase">
                        {row.getValue<string>('name').charAt(0)}
                    </div>
                    <span className="font-medium">{row.getValue('name')}</span>
                </div>
            ),
        },

        // Kolom Email
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <SortButton column={column}>Email</SortButton>
            ),
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.getValue('email')}
                </span>
            ),
        },

        // Kolom Role
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <span className="text-sm capitalize">
                    {row.getValue('role')}
                </span>
            ),
        },

        // Kolom Status
        {
            accessorKey: 'status_label',
            header: 'Status',
            cell: ({ row }) => (
                <StatusBadge status={row.getValue('status_label')} />
            ),
        },

        // Kolom Tanggal
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <SortButton column={column}>Dibuat</SortButton>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {new Date(row.getValue('created_at')).toLocaleDateString(
                        'id-ID',
                        {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        },
                    )}
                </span>
            ),
        },

        // Kolom Aksi
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <RowActions
                        onView={() => router.visit(show(user.id).url)}
                        onEdit={() => router.visit(edit(user.id).url)}
                        onDelete={() => {
                            if (confirm(`Hapus ${user.name}?`)) {
                                router.delete(destroy(user.id).url);
                            }
                        }}
                    />
                );
            },
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <DataTable
                            columns={columns}
                            data={users}
                            createUrl={create().url}
                            createLabel="Tambah Pengguna"
                            searchPlaceholder="Cari nama atau email..."
                            searchColumn="name"
                        />
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
