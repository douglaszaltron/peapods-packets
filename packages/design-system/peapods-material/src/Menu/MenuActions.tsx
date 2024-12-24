import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';

interface MenuActionsProps {
  /**
   * Callback function to clear the filter.
   */
  onClear: () => void;
  /**
   * Callback function to apply the filter.
   */
  onApply: () => void;
  /**
   * Label for the clear button.
   */
  clearLabel?: string;
  /**
   * Label for the apply button.
   */
  applyLabel?: string;
}

function MenuActions({
  onClear,
  onApply,
  clearLabel = 'Limpar',
  applyLabel = 'Aplicar',
}: MenuActionsProps) {
  const handleClear = useCallback(() => {
    onClear();
  }, [onClear]);

  const handleApply = useCallback(() => {
    onApply();
  }, [onApply]);

  return (
    <Stack
      bgcolor="background.paper"
      bottom={0}
      direction="row"
      justifyContent="space-between"
      paddingBlock={1}
      paddingInline={2}
      position="sticky"
      spacing={1}
    >
      <Button fullWidth variant="text" size="small" onClick={handleClear}>
        {clearLabel}
      </Button>
      <Button fullWidth variant="contained" size="small" onClick={handleApply}>
        {applyLabel}
      </Button>
    </Stack>
  );
}

export default MenuActions;
export type { MenuActionsProps };
