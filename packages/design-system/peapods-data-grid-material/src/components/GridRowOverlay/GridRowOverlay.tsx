import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

type GridRowOverlayProps = {
  /**
   * The number of columns that the overlay should span.
   */
  colSpan?: number;
  /**
   * The help text to display.
   */
  helpText?: React.ReactNode;
  /**
   * The icon to display.
   */
  icon?: React.ElementType;
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The children to display.
   */
  children?: React.ReactNode;
};

function GridRowOverlay({
  children,
  icon: Icon,
  message,
  helpText,
  colSpan,
}: GridRowOverlayProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ border: 'none' }}>
        <Stack
          alignItems="center"
          direction="column"
          justifyContent="center"
          spacing={1}
          textAlign="center"
        >
          {Icon && <Icon fontSize="large" color="disabled" />}
          {Boolean(message || helpText) && (
            <div>
              <Typography color="text.primary" variant="body2">
                {message}
              </Typography>
              {!!helpText && (
                <Typography color="text.secondary" variant="caption">
                  {helpText}
                </Typography>
              )}
            </div>
          )}
          {children}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default GridRowOverlay;
export type { GridRowOverlayProps };
