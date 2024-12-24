import Button from '@mui/material/Button';
import { useFormControl } from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { getHotkeyHandler } from '@peapods/utils';
import { forwardRef, useCallback } from 'react';
import TextField, { type TextFieldProps } from '../TextField';
import CloseOutlined from '../internal/svg-icons/CloseOutlined';
import SearchOutlined from '../internal/svg-icons/SearchOutlined';

interface EndAdornmentProps {
  onSearch?: () => void;
  onCancel?: () => void;
  clearText?: string;
  disabled?: boolean;
}

type SearchFieldProps = EndAdornmentProps & TextFieldProps;

const EndAdornment = (props: EndAdornmentProps) => {
  const {
    onCancel,
    onSearch,
    clearText = 'Limpar busca',
    disabled = false,
  } = props;
  const { filled } = useFormControl() ?? {};
  const handleOnCancel = () => onCancel?.();
  const handleOnSearch = () => onSearch?.();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      minWidth={96}
    >
      {filled && (
        <IconButton
          size="small"
          onClick={handleOnCancel}
          data-testid="button-search-cancel"
        >
          <Tooltip title={clearText}>
            <CloseOutlined fontSize="inherit" />
          </Tooltip>
        </IconButton>
      )}
      <Button
        type="button"
        size="large"
        variant="contained"
        onClick={handleOnSearch}
        disabled={disabled}
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        data-testid="button-search-submit"
      >
        <SearchOutlined />
      </Button>
    </Stack>
  );
};

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(props, ref) {
    const { onSearch, onCancel, clearText, disabled, ...rest } = props;
    const handleOnSearch = useCallback(() => onSearch?.(), [onSearch]);
    const handleOnCancel = useCallback(() => onCancel?.(), [onCancel]);
    return (
      <TextField
        ref={ref}
        {...rest}
        disabled={disabled}
        size="small"
        data-testid="input-search-field"
        onKeyDown={getHotkeyHandler([
          ['Escape', handleOnCancel],
          ['Enter', handleOnSearch],
        ])}
        slotProps={{
          input: {
            sx: { bgcolor: 'background.paper', paddingRight: '0' },
            endAdornment: (
              <EndAdornment
                clearText={clearText}
                disabled={disabled}
                onSearch={handleOnSearch}
                onCancel={handleOnCancel}
              />
            ),
          },
        }}
      />
    );
  },
);

export default SearchField;
export type { SearchFieldProps };
