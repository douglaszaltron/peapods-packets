import TableBody from '@mui/material/TableBody';
import { type Row, flexRender } from '@tanstack/react-table';
import GridCell from '../components/GridCell';
import GridRow from '../components/GridRow';
import { getPinnedPositions } from '../components/internal/utils';

type GridColumnBodyProps<T = unknown> = {
  /**
   * The rows to render.
   */
  rows: Row<T>[];
  /**
   * The fallback to render when theres are no rows.
   */
  fallback?: React.ReactNode;
  /**
   * The height of the column body.
   */
  height?: string;
};

function GridColumnBody<T>({ rows, height, fallback }: GridColumnBodyProps<T>) {
  return (
    <TableBody sx={{ height }}>
      {rows.map((row) => {
        return (
          <GridRow key={row.id} selected={row.getIsSelected()} hover>
            {row.getVisibleCells().map((cell) => {
              return (
                <GridCell
                  key={cell.id}
                  variant="body"
                  {...getPinnedPositions(cell.column)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </GridCell>
              );
            })}
          </GridRow>
        );
      })}
      {fallback}
    </TableBody>
  );
}

export default GridColumnBody;
export type { GridColumnBodyProps };
