import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

interface InputAddonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const InputAddonSlot = styled('div', {
  name: 'MuiInputAddon',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'disabled',
})<InputAddonProps>(({ theme }) => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  display: 'flex',
  flex: '0 0 auto',
  maxHeight: theme.typography.pxToRem(48),
  padding: theme.spacing(1, 2),
  whiteSpace: 'nowrap',
  width: 'auto',
  variants: [
    {
      props: { disabled: true },
      style: {
        color: theme.palette.action.disabled,
        pointerEvents: 'none',
      },
    },
  ],
}));

const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  function InputAddon({ children, ...props }, ref) {
    return (
      <InputAddonSlot ref={ref} {...props}>
        <Typography variant="body1" color="inherit">
          {children}
        </Typography>
      </InputAddonSlot>
    );
  },
);

export default InputAddon;
export type { InputAddonProps };
