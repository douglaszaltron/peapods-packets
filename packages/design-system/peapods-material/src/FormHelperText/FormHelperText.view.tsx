import FormHelperTextRoot from '@mui/material/FormHelperText';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import CheckCircleOutlined from '../internal/svg-icons/CheckCircleOutlined';
import InfoOutlined from '../internal/svg-icons/InfoOutlined';

interface WrapperSlotProps extends FormHelperTextProps {
  success?: boolean;
}

const FormHelperTextSlot = styled(FormHelperTextRoot, {
  name: 'MuiHelperText',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'success',
})<WrapperSlotProps>(({ theme }) => ({
  variants: [
    {
      props: { success: true },
      style: {
        color: theme.palette.success.main,
      },
    },
  ],
}));

const IconSlot = styled('span', {
  name: 'MuiHelperText',
  slot: 'Icon',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.pxToRem(16),
  opacity: 0.8,
}));

const WrapperSlot = styled('span', {
  name: 'MuiHelperText',
  slot: 'Wrapper',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  lineHeight: theme.typography.pxToRem(16),
}));

const FormHelperText = React.forwardRef<HTMLDivElement, WrapperSlotProps>(
  function FormHelperText(props, ref) {
    const { children, success, ...rest } = props;
    const Icon = success ? CheckCircleOutlined : InfoOutlined;
    return (
      <FormHelperTextSlot ref={ref} success={success} {...rest}>
        <WrapperSlot>
          <IconSlot>
            <Icon fontSize="inherit" />
          </IconSlot>
          {children}
        </WrapperSlot>
      </FormHelperTextSlot>
    );
  },
);

export default FormHelperText;
export type { FormHelperTextProps };
