import Checkbox from '@mui/material/Checkbox';
import type { CheckboxProps } from '@mui/material/Checkbox';

type GridCheckboxProps = CheckboxProps;

function GridCheckbox({ ...props }: GridCheckboxProps) {
  return <Checkbox sx={{ padding: 0 }} disableRipple {...props} />;
}

export default GridCheckbox;
export type { GridCheckboxProps };
