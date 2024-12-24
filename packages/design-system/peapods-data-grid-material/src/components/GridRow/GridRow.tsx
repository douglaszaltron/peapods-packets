import { tableCellClasses } from '@mui/material/TableCell';
import TableRow, {
  tableRowClasses,
  type TableRowProps,
} from '@mui/material/TableRow';
import { darken, lighten, styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

type GridRowProps = PropsWithChildren<TableRowProps> & {
  /**
   * If true, the row will be striped.
   */
  striped?: 'odd' | 'even';
};

const GridRowRoot = styled(TableRow, {
  name: 'MuiGridRow',
  slot: 'Root',
  shouldForwardProp: (prop: string) => !['striped'].includes(prop),
})<TableRowProps & { striped?: 'odd' | 'even' }>(
  ({ theme, striped, selected }) => {
    const light = theme.palette.mode === 'light';
    const bgColor = light ? lighten : darken;
    const bgHover = theme.palette.grey[light ? 100 : 700];

    return {
      ...(!selected &&
        striped === 'odd' && {
          '&:nth-of-type(odd)': {
            background: theme.palette.action.hover,
          },
        }),

      ...(!selected &&
        striped === 'even' && {
          '&:nth-of-type(even)': {
            background: theme.palette.action.hover,
          },
        }),

      [`&.${tableRowClasses.hover}:hover`]: {
        backgroundColor: 'transparent',
        [`& .${tableCellClasses.root}`]: {
          backgroundColor: bgHover,
        },
      },

      [`&.${tableRowClasses.selected}`]: {
        backgroundColor: 'transparent',
        [`& .${tableCellClasses.root}`]: {
          backgroundColor: bgColor(theme.palette.primary.light, 0.94),
        },
        '&:hover': {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: bgColor(theme.palette.primary.light, 0.9),
          },
        },
      },
    };
  },
);

function GridRow({ children, ...props }: GridRowProps) {
  return <GridRowRoot {...props}>{children}</GridRowRoot>;
}

export default GridRow;
export type { GridRowProps };
