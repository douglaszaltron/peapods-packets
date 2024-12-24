import TextFieldSlot, { type TextFieldProps } from '@mui/material/TextField';
import * as React from 'react';
import FloatingInput from '../FloatingInput';
import FloatingInputLabel from '../FloatingInputLabel';
import FormHelperText from '../FormHelperText';

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    return (
      <TextFieldSlot
        {...props}
        ref={ref}
        slots={{
          formHelperText: FormHelperText,
          input: FloatingInput,
          inputLabel: FloatingInputLabel,
        }}
      />
    );
  },
);

export default TextField;
export type { TextFieldProps };
