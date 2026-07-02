type UsePaginationOptions = {
    totalItems: number;
    maxVisible?: number;
    selectedIndex?: number;
};
type UsePaginationResult<T> = {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    needsPagination: boolean;
    pageSize: number;
    getVisibleItems: (items: T[]) => T[];
    toActualIndex: (visibleIndex: number) => number;
    isOnCurrentPage: (actualIndex: number) => boolean;
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    handleSelectionChange: (newIndex: number, setSelectedIndex: (index: number) => void) => void;
    handlePageNavigation: (direction: 'left' | 'right', setSelectedIndex: (index: number) => void) => boolean;
    scrollPosition: {
        current: number;
        total: number;
        canScrollUp: boolean;
        canScrollDown: boolean;
    };
};
export declare function usePagination<T>({ totalItems, maxVisible, selectedIndex, }: UsePaginationOptions): UsePaginationResult<T>;
export {};
//# sourceMappingURL=usePagination.d.ts.map