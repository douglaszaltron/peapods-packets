import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { type PropsWithChildren, isValidElement } from 'react';
import InfoOutlined from '../internal/svg-icons/InfoOutlined';

type GridHeaderLabelProps = PropsWithChildren & {
  /**
   * The help text to display in the tooltip.
   */
  helpText?: string;
};

const GridHeaderLabel = ({ children, helpText }: GridHeaderLabelProps) => {
  if (isValidElement(children)) {
    return children;
  }
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography variant="subtitle2" lineHeight={1}>
        {children}
      </Typography>
      {helpText && (
        <Tooltip title={helpText} arrow>
          <InfoOutlined fontSize="small" color="action" />
        </Tooltip>
      )}
    </Stack>
  );
};

export default GridHeaderLabel;
export type { GridHeaderLabelProps };
