import { useFormControl } from '@mui/material/FormControl';
import InputLabel, {
  inputLabelClasses,
  type InputLabelProps,
} from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const InputLabelSlot = styled(InputLabel, {
  name: 'MuiFloatingInput',
  slot: 'InputLabel',
  shouldForwardProp: (prop) => prop !== 'adornedStart',
})<{ adornedStart?: boolean }>(() => {
  return {
    [`&.${inputLabelClasses.outlined}`]: {
      transform: 'translate(16px, 12px) scale(1)',
    },
    [`&.${inputLabelClasses.shrink}`]: {
      transform: 'translate(16px, 4px) scale(0.75)',
    },
    variants: [
      {
        props: { adornedStart: true },
        style: {
          [`&.${inputLabelClasses.outlined}`]: {
            transform: 'translate(46px, 16px) scale(1)',
          },
          [`&.${inputLabelClasses.shrink}`]: {
            transform: 'translate(46px, 4px) scale(0.75)',
          },
        },
      },
    ],
  };
});

const FloatingInputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  function InputLabel(props, ref) {
    const control = useFormControl();
    const { adornedStart } = control ?? {};
    return <InputLabelSlot adornedStart={adornedStart} {...props} ref={ref} />;
  },
);

type FloatingInputLabelProps = InputLabelProps;

export default FloatingInputLabel;
export type { FloatingInputLabelProps };
