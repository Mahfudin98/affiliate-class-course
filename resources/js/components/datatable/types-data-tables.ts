import type { Column, ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /** URL untuk create data baru (opsional) */
    createUrl?: string;
    /** Label tombol create (default: "Tambah Data") */
    createLabel?: string;
    /** Placeholder search input */
    searchPlaceholder?: string;
    /** Kolom yang dicari saat search (harus sesuai accessorKey) */
    searchColumn?: string;
    /** Tampilkan tombol export (opsional) */
    onExport?: () => void;
    /** Total data untuk server-side pagination (opsional) */
    totalRows?: number;
}

export interface SortButtonProps<TData, TValue> {
    column: Column<TData, TValue>;
    children: React.ReactNode;
}
