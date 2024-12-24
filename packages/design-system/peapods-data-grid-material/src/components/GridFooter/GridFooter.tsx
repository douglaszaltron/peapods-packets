import TableFooter, { type TableFooterProps } from '@mui/material/TableFooter';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

type GridFooterProps = PropsWithChildren<TableFooterProps>;

const GridFooterRoot = styled(TableFooter, {
  name: 'MuiGridFooter',
  slot: 'Root',
})<GridFooterProps>(() => ({
  height: 48,
}));

function GridFooter({ children, ...props }: GridFooterProps) {
  return <GridFooterRoot {...props}>{children}</GridFooterRoot>;
}

export default GridFooter;
export type { GridFooterProps };
