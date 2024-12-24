import CircularProgress from '@mui/material/CircularProgress';
import GridRowOverlay, { type GridRowOverlayProps } from '../GridRowOverlay';

export type GridRowLoadingProps = GridRowOverlayProps;

export default function GridRowLoading({ colSpan }: GridRowLoadingProps) {
  return (
    <GridRowOverlay colSpan={colSpan}>
      <CircularProgress size={24} />
    </GridRowOverlay>
  );
}
