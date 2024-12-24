import type { Table } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import GridColumnBody from '../GridColumnBody';
import GridColumnFooters from '../GridColumnFooters';
import GridColumnHeaders from '../GridColumnHeaders';
import {
  GridContainer,
  GridPagination,
  GridPanel,
  GridRefetchingOverlay,
  GridRowEmpty,
  GridRowError,
  GridRowLoading,
  GridRowNoItemFound,
  type GridRowOverlayProps,
} from '../components';

interface DataGridProps<T> {
  /**
   * The table instance.
   */
  table: Table<T>;
  /**
   * The size of the table (dense or not).
   */
  size?: 'small' | 'medium';
  /**
   * The table width.
   */
  width?: string;
  /**
   * The table height.
   */
  height?: string;
  /**
   * Whether the data is filtering.
   */
  filtering?: boolean;
  /**
   * Whether the data is loading.
   */
  loading?: boolean;
  /**
   * Whether the data is refetching.
   */
  refetching?: boolean;
  /**
   * Whether the data has an error.
   */
  error?: boolean;
  /**
   * Whether the data has a footer.
   * @default true
   */
  hideFooter?: boolean;
  /**
   * Whether the data has a pagination.
   * @default false
   */
  hideFooterPagination?: boolean;
  /**
   * The page size options.
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * The slots to render.
   */
  slots?: {
    /**
     * The empty slot.
     */
    empty?: React.ElementType<GridRowOverlayProps>;
    /**
     * The error slot.
     */
    error?: React.ElementType<GridRowOverlayProps>;
    /**
     * The loading slot.
     */
    loading?: React.ElementType<GridRowOverlayProps>;
    /**
     * The filtering slot.
     */
    filtering?: React.ElementType<GridRowOverlayProps>;
  };
  /**
   * The slot props.
   */
  slotProps?: {
    /**
     * The empty slot props.
     */
    empty?: GridRowOverlayProps;
    /**
     * The error slot props.
     */
    error?: GridRowOverlayProps;
    /**
     * The loading slot props.
     */
    loading?: GridRowOverlayProps;
    /**
     * The filtering slot props.
     */
    filtering?: GridRowOverlayProps;
  };
}

/**
 * DataGrid is a component that renders a data table with pagination
 * @template T - Table data type
 * @param {Table<T>} table - TanStack Table instance
 */
function DataGrid<T>({ table, ...props }: DataGridProps<T>) {
  if (!table) return null;

  const rows = table.getRowModel().rows;
  const groups = table.getHeaderGroups();
  const footer = table.getFooterGroups();
  const paginationState = table.getState().pagination;
  const { pageIndex, pageSize } = paginationState;

  const {
    hideFooter = true,
    hideFooterPagination = false,
    refetching = false,
    error = false,
    loading = false,
    filtering = false,
    height = '390px',
    width = '100%',
    size = 'medium',
    pageSizeOptions = [10, 20, 50, 100],
    slots = {},
    slotProps = {},
  } = props;

  const setPageIndex = useCallback(
    (page: number) => {
      table.setPageIndex(page);
    },
    [table],
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      table.setPageSize(pageSize);
    },
    [table],
  );

  const rowCount = useMemo(() => {
    return table.getRowCount();
  }, [table]);

  const colSpan = useMemo(() => table.getAllColumns().length, [table]);

  const renderFallback = useMemo(() => {
    const EmptySlot = slots.empty ?? GridRowEmpty;
    const ErrorSlot = slots.error ?? GridRowError;
    const LoadingSlot = slots.loading ?? GridRowLoading;
    const FilteringSlot = slots.filtering ?? GridRowNoItemFound;
    return {
      empty: <EmptySlot colSpan={colSpan} {...slotProps.empty} />,
      error: <ErrorSlot colSpan={colSpan} {...slotProps.error} />,
      loading: <LoadingSlot colSpan={colSpan} {...slotProps.loading} />,
      filtering: <FilteringSlot colSpan={colSpan} {...slotProps.filtering} />,
    };
  }, [slots, slotProps, colSpan]);

  const getFallback = useCallback(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (filtering) return 'filtering';
    if (rows.length === 0) return 'empty';
    return null;
  }, [rows.length, error, loading, filtering]);

  const currentFallback = getFallback();
  const stretch = Boolean(currentFallback) && !rows?.length;
  const fallbackContent = currentFallback
    ? renderFallback[currentFallback]
    : null;

  return (
    <GridPanel>
      {refetching && <GridRefetchingOverlay />}
      <GridContainer
        height={height}
        width={width}
        size={size}
        stretch={stretch}
        aria-busy={loading || refetching}
      >
        <GridColumnHeaders groups={groups} />
        <GridColumnBody rows={rows} fallback={fallbackContent} />
        {!hideFooter && <GridColumnFooters groups={footer} />}
      </GridContainer>
      {!hideFooterPagination && (
        <GridPagination
          count={rowCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </GridPanel>
  );
}

export default DataGrid;
export type { DataGridProps };
