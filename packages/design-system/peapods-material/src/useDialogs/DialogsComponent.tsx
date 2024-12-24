import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { PropsWithChildren } from 'react';
import CloseOutlined from '../internal/svg-icons/CloseOutlined';

interface DialogHeaderProps {
  onClose?: (event: React.SyntheticEvent) => void;
}

/**
 * A wrapper component for dialog content.
 * Renders children as DialogContentText if it's a string,
 * or directly if it's a React element.
 */
const DialogContentWrapper = ({ children }: PropsWithChildren) => {
  if (typeof children === 'string') {
    return <DialogContentText>{children}</DialogContentText>;
  }
  return <>{children}</>;
};

/**
 * Dialog footer component that wraps children in MUI DialogActions
 * with right-aligned row layout.
 */
const DialogFooter = ({ children }: PropsWithChildren) => {
  return (
    <DialogActions>
      <Stack padding={1} spacing={1} direction="row" justifyContent="flex-end">
        {children}
      </Stack>
    </DialogActions>
  );
};

/**
 * Dialog header component that renders a title and a close button.
 * with left-aligned title and right-aligned close button.
 */
const DialogHeader = ({
  children,
  onClose,
}: PropsWithChildren<DialogHeaderProps>) => {
  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      justifyContent="space-between"
      paddingBlock={2}
      paddingLeft={2}
      paddingRight={1}
    >
      <Typography variant="h6">{children}</Typography>
      {!!onClose && (
        <IconButton size="small" onClick={onClose} aria-label="close">
          <CloseOutlined />
        </IconButton>
      )}
    </Stack>
  );
};

/**
 * Dialog body component that wraps children in a DialogContent
 * with no padding on the block axis.
 */
const DialogBody = ({ children }: PropsWithChildren) => {
  return (
    <DialogContent sx={{ paddingBlock: 0, paddingInline: 2 }}>
      <DialogContentWrapper>{children}</DialogContentWrapper>
    </DialogContent>
  );
};

export { DialogBody, DialogFooter, DialogHeader, DialogContentWrapper };
export type { DialogHeaderProps };
