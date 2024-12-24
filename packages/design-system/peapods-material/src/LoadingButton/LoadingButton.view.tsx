import Button, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface LoadingButtonProps {
  loading?: boolean;
}

const LoadingButtonRoot = styled(Button, {
  name: 'MuiLoadingButton',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'loading',
})<LoadingButtonProps>(() => {
  return {
    variants: [
      {
        props: { loading: true },
        style: {
          pointerEvents: 'none',
        },
      },
    ],
  };
});

const LabelSlot = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'Label',
  shouldForwardProp: (prop) => prop !== 'loading',
})<{ loading: boolean }>(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    variants: [
      {
        props: { loading: true },
        style: {
          visibility: 'hidden',
        },
      },
    ],
  };
});

const CircularProgressSlot = styled(CircularProgress, {
  name: 'MuiLoadingButton',
  slot: 'Progress',
})(() => {
  return {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  };
});

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps<'button', LoadingButtonProps>
>(function LoadingButton(inProps, ref) {
  const { loading = false, children, ...rest } = inProps;

  return (
    <LoadingButtonRoot loading={loading} ref={ref} {...rest}>
      <LabelSlot loading={loading}>{children}</LabelSlot>
      {loading && <CircularProgressSlot size={20} color="inherit" />}
    </LoadingButtonRoot>
  );
});

export default LoadingButton;
export type { LoadingButtonProps };
