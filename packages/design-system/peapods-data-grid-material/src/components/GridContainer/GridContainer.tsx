import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { memo } from 'react';
import type { PropsWithChildren } from 'react';

const DEFAULT_SIZE = 'medium';

type GridContainerProps = PropsWithChildren<{
  /**
   * The height of the grid container.
   */
  height?: string;
  /**
   * The width of the grid container.
   */
  width?: string;
  /**
   * The size of the grid container.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * Stretch the grid container to the height of the parent.
   * @default false
   */
  stretch?: boolean;
}>;

const GridContainer = memo(function GridContainer({
  children,
  height,
  width,
  size = DEFAULT_SIZE,
  stretch = false,
}: GridContainerProps) {
  const tableHeight = stretch ? '100%' : undefined;
  return (
    <TableContainer sx={{ height, width }}>
      <Table stickyHeader size={size} sx={{ height: tableHeight }}>
        {children}
      </Table>
    </TableContainer>
  );
});

export default GridContainer;
export type { GridContainerProps };
