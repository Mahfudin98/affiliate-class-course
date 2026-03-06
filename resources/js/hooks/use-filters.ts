import { useMemo, useState } from 'react';

type FilterConfig<T> = {
    searchKey?: keyof T;
    filters?: Record<string, (item: T) => string>;
    pageSize?: number;
};

export function useFilters<T>(data: T[], config: FilterConfig<T>) {
    const pageSize = config.pageSize ?? 10;

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const [activeFilters, setActiveFilters] = useState<
        Record<string, string[]>
    >({});

    const toggleFilter = (
        filterName: string,
        value: string,
        isChecked: boolean,
    ) => {
        setActiveFilters((prev) => {
            const current = prev[filterName] || [];

            const updated = isChecked
                ? [...current, value]
                : current.filter((v) => v !== value);

            return {
                ...prev,
                [filterName]: updated,
            };
        });
        setPage(1);
    };

    const filteredData = useMemo(() => {
        let filtered = data;

        Object.entries(activeFilters).forEach(([filterName, values]) => {
            if (!values.length) return;

            const getValue = config.filters?.[filterName];
            if (!getValue) return;

            filtered = filtered.filter((item) =>
                values.includes(getValue(item)),
            );
        });

        if (config.searchKey && search.trim()) {
            const keyword = search.toLowerCase();
            const searchKey = config.searchKey;

            filtered = filtered.filter((item) =>
                String(item[searchKey]).toLowerCase().includes(keyword),
            );
        }

        return filtered;
    }, [data, activeFilters, search, config]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
    }, [filteredData, page, pageSize]);

    const nextPage = () => {
        setPage((p) => Math.min(p + 1, totalPages));
    };

    const prevPage = () => {
        setPage((p) => Math.max(p - 1, 1));
    };

    const goToPage = (p: number) => {
        setPage(Math.min(Math.max(p, 1), totalPages));
    };

    const resetFilters = () => {
        setActiveFilters({});
        setSearch('');
        setPage(1);
    };

    const handleSetSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return {
        search,
        setSearch: handleSetSearch,
        toggleFilter,
        activeFilters,
        resetFilters,

        page,
        totalPages,
        nextPage,
        prevPage,
        goToPage,

        filteredData,
        paginatedData,
    };
}
