import Paper, { type PaperOwnProps } from '@mui/material/Paper';
import { darken, lighten, styled } from '@mui/material/styles';
import { forwardRef } from 'react';

interface SurfaceProps extends PaperOwnProps {
  color?:
    | 'default'
    | 'secondary'
    | 'primary'
    | 'error'
    | 'success'
    | 'info'
    | 'warning';
  dashed?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  intensity?: 'low' | 'high';
}

const SurfaceRoot = styled(Paper, {
  name: 'MuiSurface',
  slot: 'Root',
  shouldForwardProp: (prop) =>
    prop !== 'dashed' && prop !== 'hovered' && prop !== 'intensity',
})<SurfaceProps>(({ theme, intensity }) => {
  const bgcolor = theme.palette.mode === 'light' ? lighten : darken;
  const opacity = intensity === 'low' ? 0.7 : 0;
  return {
    overflow: 'hidden',
    outlineColor: theme.palette.primary.main,
    variants: [
      {
        props: { square: false },
        style: {
          borderRadius: '12px',
        },
      },
      {
        props: { color: 'primary' },
        style: {
          backgroundColor: bgcolor(theme.palette.primary.main, 0.9),
          color: theme.palette.primary.main,
        },
      },
      {
        props: { color: 'secondary' },
        style: {
          backgroundColor: bgcolor(theme.palette.secondary.main, 0.9),
          color: theme.palette.secondary.main,
        },
      },
      {
        props: { color: 'error' },
        style: {
          backgroundColor: bgcolor(theme.palette.error.main, 0.9),
          color: theme.palette.error.main,
        },
      },
      {
        props: { color: 'success' },
        style: {
          backgroundColor: bgcolor(theme.palette.success.main, 0.9),
          color: theme.palette.success.main,
        },
      },
      {
        props: { color: 'warning' },
        style: {
          backgroundColor: bgcolor(theme.palette.warning.main, 0.9),
          color: theme.palette.warning.main,
        },
      },
      {
        props: { color: 'info' },
        style: {
          backgroundColor: bgcolor(theme.palette.info.main, 0.9),
          color: theme.palette.info.main,
        },
      },
      {
        props: { variant: 'outlined', color: 'primary' },
        style: {
          borderColor: bgcolor(theme.palette.primary.main, opacity),
        },
      },

      {
        props: { variant: 'outlined', color: 'secondary' },
        style: {
          borderColor: bgcolor(theme.palette.secondary.main, opacity),
        },
      },
      {
        props: { variant: 'outlined', color: 'error' },
        style: {
          borderColor: bgcolor(theme.palette.error.main, opacity),
        },
      },
      {
        props: { variant: 'outlined', color: 'success' },
        style: {
          borderColor: bgcolor(theme.palette.success.main, opacity),
        },
      },
      {
        props: { variant: 'outlined', color: 'warning' },
        style: {
          borderColor: bgcolor(theme.palette.warning.main, opacity),
        },
      },
      {
        props: { variant: 'outlined', color: 'info' },
        style: {
          borderColor: bgcolor(theme.palette.info.main, opacity),
        },
      },
      {
        props: { variant: 'outlined', dashed: true },
        style: {
          borderStyle: 'dashed',
        },
      },
      {
        props: { variant: 'outlined', hovered: true },
        style: {
          ':hover': {
            borderColor: theme.palette.action.active,
          },
        },
      },
      {
        props: { disabled: true },
        style: {
          borderColor: theme.palette.action.disabled,
          pointerEvents: 'none',
          opacity: 0.5,
        },
      },
    ],
  };
});

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(props, ref) {
    const { variant = 'outlined', intensity = 'high', ...rest } = props;
    return (
      <SurfaceRoot
        ref={ref}
        variant={variant}
        intensity={intensity}
        {...rest}
      />
    );
  },
);

export default Surface;
export type { SurfaceProps };
