import TableHead, { type TableHeadProps } from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

type GridHeadProps = PropsWithChildren<TableHeadProps>;

const GridHeadRoot = styled(TableHead, {
  name: 'MuiGridHead',
  slot: 'Root',
})<GridHeadProps>(() => ({
  height: 56,
}));

function GridHead({ children, ...props }: GridHeadProps) {
  return <GridHeadRoot {...props}>{children}</GridHeadRoot>;
}

export default GridHead;
export type { GridHeadProps };
