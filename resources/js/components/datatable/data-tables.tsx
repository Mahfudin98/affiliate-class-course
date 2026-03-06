import { router } from '@inertiajs/react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Download,
    EyeOff,
    PlusCircle,
    SearchIcon,
    SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import type { DataTableProps } from './types-data-tables';

export function DataTable<TData, TValue>({
    columns,
    data,
    createUrl,
    createLabel = 'Tambah Data',
    searchPlaceholder = 'Cari data...',
    searchColumn,
    onExport,
    totalRows,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [showColumnToggle, setShowColumnToggle] = useState(false);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection },
    });

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div className="space-y-4">
            {/* ── Toolbar ── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative w-full max-w-sm">
                    <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={
                            searchColumn
                                ? ((table
                                      .getColumn(searchColumn)
                                      ?.getFilterValue() as string) ?? '')
                                : ''
                        }
                        onChange={(e) =>
                            searchColumn &&
                            table
                                .getColumn(searchColumn)
                                ?.setFilterValue(e.target.value)
                        }
                        className="h-9 w-full rounded-md border border-input bg-background py-2 pr-3 pl-9 text-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Selected info */}
                    {selectedCount > 0 && (
                        <span className="text-sm text-muted-foreground">
                            {selectedCount} dipilih
                        </span>
                    )}

                    {/* Column Visibility Toggle */}
                    <div className="relative">
                        <Button
                            type="button"
                            onClick={() =>
                                setShowColumnToggle(!showColumnToggle)
                            }
                            className="cursor-pointer border bg-background text-foreground hover:bg-background/50"
                        >
                            <SlidersHorizontal className="size-5" />
                            <span className="hidden sm:inline">Kolom</span>
                        </Button>
                        {showColumnToggle && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowColumnToggle(false)}
                                />
                                <div className="absolute top-11 right-0 z-20 min-w-48 rounded-lg border border-border bg-popover py-2 shadow-lg">
                                    <p className="px-3 pb-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        Tampilkan Kolom
                                    </p>
                                    {table
                                        .getAllColumns()
                                        .filter((col) => col.getCanHide())
                                        .map((col) => (
                                            <label
                                                key={col.id}
                                                className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent"
                                            >
                                                <Checkbox
                                                    checked={col.getIsVisible()}
                                                    onChange={(e) =>
                                                        col.toggleVisibility(
                                                            !!e,
                                                        )
                                                    }
                                                    className="accent-primary"
                                                />
                                                <span className="capitalize">
                                                    {col.id}
                                                </span>
                                            </label>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Export */}
                    {onExport && (
                        <Button
                            onClick={onExport}
                            className="cursor-pointer border bg-background text-foreground hover:bg-background/50"
                        >
                            <Download />
                            <span className="hidden sm:inline">Export</span>
                        </Button>
                    )}

                    {/* Create */}
                    {createUrl && (
                        <Button
                            onClick={() => router.visit(createUrl)}
                            className="cursor-pointer border bg-primary text-white hover:bg-primary/50"
                        >
                            <PlusCircle className="size-5" />
                            <span>{createLabel}</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* ── Table ── */}
            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    key={headerGroup.id}
                                    className="border-b border-border bg-muted/40"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                        className={`border-b border-border transition-colors last:border-0 hover:bg-muted/30 data-[state=selected]:bg-muted/60 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'} `}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="h-12 px-4 align-middle"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <EyeOff />
                                            <span>
                                                Tidak ada data ditemukan
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Pagination ── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Info */}
                <p className="text-sm text-muted-foreground">
                    {selectedCount > 0
                        ? `${selectedCount} dari ${table.getFilteredRowModel().rows.length} baris dipilih`
                        : `${table.getFilteredRowModel().rows.length} baris${totalRows ? ` dari ${totalRows} total` : ''}`}
                </p>

                {/* Page size + navigation */}
                <div className="flex items-center gap-4">
                    {/* Per page */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="hidden whitespace-nowrap sm:inline">
                            Baris per halaman
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) =>
                                table.setPageSize(Number(e.target.value))
                            }
                            className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            {[10, 20, 30, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Page info */}
                    <span className="text-sm whitespace-nowrap text-muted-foreground">
                        Hal {table.getState().pagination.pageIndex + 1} /{' '}
                        {table.getPageCount()}
                    </span>

                    {/* Buttons */}
                    <div className="flex items-center gap-1">
                        {[
                            {
                                action: () => table.setPageIndex(0),
                                disabled: !table.getCanPreviousPage(),
                                icon: <ChevronsLeft className="size-5" />,
                                title: 'Halaman pertama',
                            },
                            {
                                action: () => table.previousPage(),
                                disabled: !table.getCanPreviousPage(),
                                icon: <ChevronLeft className="size-5" />,
                                title: 'Sebelumnya',
                            },
                            {
                                action: () => table.nextPage(),
                                disabled: !table.getCanNextPage(),
                                icon: <ChevronRight className="size-5" />,
                                title: 'Berikutnya',
                            },
                            {
                                action: () =>
                                    table.setPageIndex(
                                        table.getPageCount() - 1,
                                    ),
                                disabled: !table.getCanNextPage(),
                                icon: <ChevronsRight className="size-5" />,
                                title: 'Halaman terakhir',
                            },
                        ].map((btn, i) => (
                            <button
                                key={i}
                                onClick={btn.action}
                                disabled={btn.disabled}
                                title={btn.title}
                                className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {btn.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
