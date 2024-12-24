import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Center from '../Center';

interface CenteredSpinnerProps {
  message?: string;
  height?: string;
}

function CenteredSpinner(props: CenteredSpinnerProps) {
  const { message, height } = props;
  return (
    <Center height={height}>
      <Stack spacing={1} alignItems="center">
        <CircularProgress size={48} data-testid="loading-progress" />
        {!!message && <Typography variant="body1">{message}</Typography>}
      </Stack>
    </Center>
  );
}

export default CenteredSpinner;
export type { CenteredSpinnerProps };
