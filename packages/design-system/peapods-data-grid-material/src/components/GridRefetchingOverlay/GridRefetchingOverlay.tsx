import LinearProgress, {
  type LinearProgressProps,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

type GridRefetchingOverlayProps = LinearProgressProps;

const GridRefetchingOverlayRoot = styled(LinearProgress, {
  name: 'MuiGridRefetchingOverlay',
  slot: 'Root',
})(() => ({
  height: 2,
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 4,
}));

function GridRefetchingOverlay({ ...props }: GridRefetchingOverlayProps) {
  return <GridRefetchingOverlayRoot {...props} />;
}

export default GridRefetchingOverlay;
export type { GridRefetchingOverlayProps };
