import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

type GridCellProps = PropsWithChildren<TableCellProps> & {
  /**
   * The width of the left pinned column.
   */
  leftPinnedWidth?: string | false;
  /**
   * The width of the right pinned column.
   */
  rightPinnedWidth?: string | false;
  /**
   * If true, the cell is the last left pinned column.
   */
  isLastLeftPinnedColumn?: boolean;
  /**
   * If true, the cell is the first right pinned column.
   */
  isFirstRightPinnedColumn?: boolean;
  /**
   * The minimum width of the cell.
   */
  minWidth?: string;
};

const GridCellRoot = styled(TableCell, {
  name: 'MuiGridCell',
  slot: 'Root',
  shouldForwardProp: (prop: string) =>
    ![
      'leftPinnedWidth',
      'rightPinnedWidth',
      'isLastLeftPinnedColumn',
      'isFirstRightPinnedColumn',
      'minWidth',
    ].includes(prop),
})<GridCellProps>(
  ({
    theme,
    variant,
    leftPinnedWidth,
    rightPinnedWidth,
    isLastLeftPinnedColumn,
    isFirstRightPinnedColumn,
    minWidth,
  }) => {
    const color =
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900];

    return {
      borderBottom: `1px solid ${color}`,

      ...(variant === 'head' && {
        padding: '13.5px 16px',
        backgroundColor: theme.palette.background.default,
      }),

      ...(variant === 'footer' && {
        padding: '13.5px 16px',
        borderBottomWidth: 0,
        backgroundColor: theme.palette.background.default,
      }),

      ...(variant === 'body' && {
        backgroundColor: theme.palette.background.paper,
      }),

      ...(minWidth && {
        '--GridCell-minWidth': minWidth,
        minWidth: 'var(--GridCell-minWidth)',
      }),

      ...(leftPinnedWidth && {
        '--GridCell-leftPinnedWidth': leftPinnedWidth,
        left: 'var(--GridCell-leftPinnedWidth)',
        position: 'sticky',
        zIndex: 2,
        ...(variant === 'head' && {
          zIndex: 3,
        }),
        ...(isLastLeftPinnedColumn && {
          boxShadow: `-1px 0 0 0 ${color} inset`,
        }),
      }),

      ...(rightPinnedWidth && {
        '--GridCell-rightPinnedWidth': rightPinnedWidth,
        right: 'var(--GridCell-rightPinnedWidth)',
        position: 'sticky',
        zIndex: 2,
        ...(variant === 'head' && {
          zIndex: 3,
        }),
        ...(isFirstRightPinnedColumn && {
          boxShadow: `1px 0 0 0 ${color} inset`,
        }),
      }),
    };
  },
);

function GridCell({ children, ...props }: GridCellProps) {
  return <GridCellRoot {...props}>{children}</GridCellRoot>;
}

export default GridCell;
export type { GridCellProps };
