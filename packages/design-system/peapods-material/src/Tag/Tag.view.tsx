import Chip, { chipClasses } from '@mui/material/Chip';
import { darken, lighten, styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { forwardRef } from 'react';

type Color =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

interface TagProps {
  color?: Color;
  disabled?: boolean;
  icon?: React.ReactElement<unknown>;
  label?: React.ReactNode;
  intensity?: 'low' | 'high';
  sx?: SxProps<Theme>;
}

const TagRoot = styled(Chip, {
  name: 'MuiTag',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'sx',
})<TagProps>(({ theme }) => {
  const bgcolor = theme.palette.mode === 'light' ? lighten : darken;
  return {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    [`& .${chipClasses.icon}`]: {
      fontSize: theme.typography.pxToRem(16),
    },
    [`& .${chipClasses.icon}`]: {
      marginLeft: theme.spacing(0.5),
    },
    variants: [
      {
        props: { color: 'primary', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.primary.light, 0.9),
          color: theme.palette.primary.dark,
        },
      },
      {
        props: { color: 'secondary', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.secondary.light, 0.9),
          color: theme.palette.secondary.dark,
        },
      },
      {
        props: { color: 'error', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.error.light, 0.9),
          color: theme.palette.error.dark,
        },
      },
      {
        props: { color: 'warning', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.warning.light, 0.9),
          color: theme.palette.warning.dark,
        },
      },
      {
        props: { color: 'info', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.info.light, 0.9),
          color: theme.palette.info.dark,
        },
      },
      {
        props: { color: 'success', intensity: 'low' },
        style: {
          backgroundColor: bgcolor(theme.palette.success.light, 0.9),
          color: theme.palette.success.dark,
        },
      },
      {
        props: { disabled: true },
        style: {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
          pointerEvents: 'none',
        },
      },
    ],
  };
});

const Tag = forwardRef<HTMLDivElement, TagProps>(function Tag(props, ref) {
  const {
    label,
    icon,
    color = 'default',
    intensity = 'low',
    disabled = false,
    sx,
    ...rest
  } = props;
  return (
    <TagRoot
      data-testid="tag"
      color={color}
      disabled={disabled}
      icon={icon}
      intensity={intensity}
      label={label}
      size="small"
      sx={sx}
      ref={ref}
      {...rest}
    />
  );
});

export default Tag;
export type { TagProps };
