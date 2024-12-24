import TablePagination, {
  tablePaginationClasses,
  type TablePaginationProps,
} from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

type GridPaginationProps = {
  /**
   * The total number of items.
   */
  count: number;
  /**
   * The current page index.
   */
  pageIndex: number;
  /**
   * The current page size.
   */
  pageSize: number;
  /**
   * The function to call when the page index changes.
   */
  setPageIndex: (page: number) => void;
  /**
   * The function to call when the page size changes.
   */
  setPageSize: (pageSize: number) => void;
  /**
   * The page size options.
   */
  pageSizeOptions?: number[];
};

const GridPaginationRoot = styled(TablePagination, {
  name: 'MuiGridPagination',
  slot: 'Root',
})<TablePaginationProps>(({ theme }) => {
  const border =
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[900];

  return {
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${border}`,
    [`& .${tablePaginationClasses.toolbar}`]: {
      minHeight: 48,
    },
  };
});

function GridPagination({
  count,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  pageSizeOptions = [10, 25, 50, 100],
}: GridPaginationProps) {
  return (
    <GridPaginationRoot
      component="div"
      count={count}
      page={pageIndex}
      rowsPerPage={pageSize}
      rowsPerPageOptions={pageSizeOptions}
      onPageChange={(_, page) => {
        setPageIndex(page);
      }}
      onRowsPerPageChange={(event) => {
        const size = event.target.value ? Number(event.target.value) : 10;
        setPageSize(size);
      }}
    />
  );
}

export default GridPagination;
export type { GridPaginationProps };
