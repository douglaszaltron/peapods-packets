import TableRow from '@mui/material/TableRow';
import {
  type Header,
  type HeaderGroup,
  flexRender,
} from '@tanstack/react-table';
import GridCell from '../components/GridCell';
import GridHead from '../components/GridHead';
import GridHeaderLabel from '../components/GridHeaderLabel';
import GridSortLabel from '../components/GridSortLabel';
import {
  getColumnWidth,
  getPinnedPositions,
} from '../components/internal/utils';

type GridColumnHeadersProps<T = unknown> = {
  /**
   * The header groups to render.
   */
  groups: HeaderGroup<T>[];
};

const renderHeaderContent = <T,>(header: Header<T, unknown>) => {
  const headerContent = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );
  return <GridHeaderLabel>{headerContent}</GridHeaderLabel>;
};

function GridColumnHeaders<T>({ groups }: GridColumnHeadersProps<T>) {
  return (
    <GridHead>
      {groups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            return (
              <GridCell
                key={header.id}
                colSpan={header.colSpan}
                variant="head"
                width={getColumnWidth(header.column)}
                {...getPinnedPositions(header.column)}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {canSort ? (
                      <GridSortLabel
                        sorted={header.column.getIsSorted() !== false}
                        sortDirection={header.column.getIsSorted()}
                        onSort={header.column.getToggleSortingHandler()}
                      >
                        {renderHeaderContent(header)}
                      </GridSortLabel>
                    ) : (
                      renderHeaderContent(header)
                    )}
                  </>
                )}
              </GridCell>
            );
          })}
        </TableRow>
      ))}
    </GridHead>
  );
}

export default GridColumnHeaders;
export type { GridColumnHeadersProps };
