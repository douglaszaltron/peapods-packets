import OutlinedInput, {
  outlinedInputClasses,
  type OutlinedInputProps,
} from '@mui/material/OutlinedInput';
import { selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const FloatingInputSlot = styled(OutlinedInput, {
  name: 'MuiFloatingInput',
  slot: 'Root',
})(({ theme }) => ({
  [`&.${outlinedInputClasses.root}`]: {
    borderRadius: '6px',
    backgroundColor: theme.palette.background.paper,
  },

  '&.Mui-disabled, &.Mui-readOnly': {
    backgroundColor: theme.palette.action.disabledBackground,
  },

  [`& .${outlinedInputClasses.input}`]: {
    paddingTop: '20px',
    paddingRight: '16px',
    paddingBottom: '4px',
    paddingLeft: '16px',
    minHeight: '24px',
  },

  [`& .${outlinedInputClasses.input}.${selectClasses.select}`]: {
    minHeight: '24px',
  },

  [`& .${outlinedInputClasses.inputMultiline}`]: {
    padding: '3px 0',
  },

  [`& .${outlinedInputClasses.inputAdornedStart}`]: {
    paddingLeft: '0',
  },

  [`& .${outlinedInputClasses.inputAdornedEnd}`]: {
    paddingRight: '0',
  },
}));

const FloatingInput = React.forwardRef<HTMLInputElement, OutlinedInputProps>(
  function FloatingInput(props, ref) {
    return <FloatingInputSlot notched={false} {...props} ref={ref} />;
  },
);

type FloatingInputProps = OutlinedInputProps;

export default FloatingInput;
export type { FloatingInputProps };
