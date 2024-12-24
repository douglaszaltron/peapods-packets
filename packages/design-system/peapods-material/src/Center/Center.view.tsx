import Box from '@mui/material/Box';
import { type SxProps, type Theme, styled } from '@mui/material/styles';
import { type PropsWithChildren, forwardRef } from 'react';

interface CenterProps {
  height?: string;
  sx?: SxProps<Theme>;
}

const CenterRoot = styled(Box, {
  name: 'MuiCenter',
  slot: 'Root',
  shouldForwardProp: (prop: string) =>
    !['height'].includes(prop) && prop !== 'sx',
})<CenterProps>(({ height = '100vh' }) => ({
  '--Center-height': height,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 'var(--Center-height)',
}));

const Center = forwardRef<HTMLDivElement, PropsWithChildren<CenterProps>>(
  function Center(props, ref) {
    return <CenterRoot data-testid="center" {...props} ref={ref} />;
  },
);

export default Center;
export type { CenterProps };
