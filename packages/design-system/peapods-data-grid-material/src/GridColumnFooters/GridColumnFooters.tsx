import TableRow from '@mui/material/TableRow';
import { type HeaderGroup, flexRender } from '@tanstack/react-table';
import GridCell from '../components/GridCell';
import GridFooter from '../components/GridFooter';
import GridHeaderLabel from '../components/GridHeaderLabel';
import { getPinnedPositions } from '../components/internal/utils';

type GridColumnFootersProps<T = unknown> = {
  /**
   * The header groups to render.
   */
  groups: HeaderGroup<T>[];
};

function GridColumnFooters<T>({ groups }: GridColumnFootersProps<T>) {
  return (
    <GridFooter>
      {groups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <GridCell
                key={header.id}
                colSpan={header.colSpan}
                variant="footer"
                width={header.column.getSize()}
                {...getPinnedPositions(header.column)}
              >
                {header.isPlaceholder ? null : (
                  <GridHeaderLabel>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                  </GridHeaderLabel>
                )}
              </GridCell>
            );
          })}
        </TableRow>
      ))}
    </GridFooter>
  );
}

export default GridColumnFooters;
export type { GridColumnFootersProps };
