import {
    ChevronDown,
    ChevronsUpDown,
    ChevronUp,
    Edit2,
    Eye,
    MoreHorizontal,
    Trash2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { SortButtonProps } from './types-data-tables';

/** Tombol Sort di header kolom */
export function SortButton<TData, TValue>({
    column,
    children,
}: SortButtonProps<TData, TValue>) {
    return (
        <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="group -ml-1 flex items-center gap-1.5 rounded px-1 py-0.5 transition-colors hover:bg-muted hover:text-foreground"
        >
            {children}
            <span className="text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                {column.getIsSorted() === 'asc' ? (
                    <ChevronUp className="size-4" />
                ) : column.getIsSorted() === 'desc' ? (
                    <ChevronDown className="size-4" />
                ) : (
                    <ChevronsUpDown className="size-4" />
                )}
            </span>
        </button>
    );
}

/** Badge status */
export function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; class: string }> = {
        active: {
            label: 'Aktif',
            class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        },
        inactive: {
            label: 'Nonaktif',
            class: 'bg-gray-50 text-gray-600 ring-gray-500/20',
        },
        pending: {
            label: 'Pending',
            class: 'bg-amber-50 text-amber-700 ring-amber-600/20',
        },
        banned: {
            label: 'Banned',
            class: 'bg-red-50 text-red-700 ring-red-600/20',
        },
    };
    const s = map[status] ?? {
        label: status,
        class: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${s.class}`}
        >
            {s.label}
        </span>
    );
}

/** Dropdown aksi per baris */
export function RowActions({
    onView,
    onEdit,
    onDelete,
}: {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-md">
                    <MoreHorizontal />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {onView && (
                    <DropdownMenuItem onClick={onView}>
                        <Eye className="mr-2 h-4 w-4" />
                        Detail
                    </DropdownMenuItem>
                )}

                {onEdit && (
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                )}

                {onDelete && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={onDelete}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
