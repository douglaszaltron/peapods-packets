import TableSortLabel from '@mui/material/TableSortLabel';
import type { SortDirection } from '@tanstack/react-table';
import type { PropsWithChildren } from 'react';
import { visuallyHidden } from '../internal/utils';

type GridSortLabelProps = PropsWithChildren<{
  /**
   * If true, the label will be displayed in an active state.
   */
  sorted: boolean;
  /**
   * The direction of the sort.
   */
  sortDirection: SortDirection | false;
  /**
   * The function to call when the label is clicked.
   */
  onSort: ((event: unknown) => void) | undefined;
}>;

function GridSortLabel({
  children,
  sorted,
  sortDirection,
  onSort,
}: GridSortLabelProps) {
  return (
    <TableSortLabel
      active={sorted}
      direction={sortDirection === 'desc' ? 'desc' : 'asc'}
      onClick={onSort}
      sx={{ lineHeight: 1 }}
    >
      {children}
      {sorted ? (
        <span style={visuallyHidden}>
          {sortDirection === 'desc'
            ? 'Ordenado decrescente'
            : 'Ordenado crescente'}
        </span>
      ) : null}
    </TableSortLabel>
  );
}

export default GridSortLabel;
export type { GridSortLabelProps };
