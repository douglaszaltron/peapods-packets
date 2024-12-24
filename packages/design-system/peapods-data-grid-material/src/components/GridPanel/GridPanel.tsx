import Paper, { type PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

type GridPanelProps = PropsWithChildren<PaperProps>;

const GridPanelRoot = styled(Paper, {
  name: 'MuiGridPanel',
  slot: 'Root',
})<GridPanelProps>(() => ({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
}));

function GridPanel({ children, ...props }: GridPanelProps) {
  return (
    <GridPanelRoot variant="outlined" {...props}>
      {children}
    </GridPanelRoot>
  );
}

export default GridPanel;
export type { GridPanelProps };
