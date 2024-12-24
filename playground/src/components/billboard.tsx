import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Group } from '@peapods/material';
import type { ReactNode } from 'react';

interface BillboardProps {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  branding?: ReactNode;
  children?: ReactNode;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

function Billboard({
  branding,
  subtitle,
  title,
  description,
  children,
  alignItems,
  textAlign,
}: BillboardProps) {
  return (
    <Stack
      spacing={{ xs: 4, md: 7 }}
      alignItems={alignItems}
      textAlign={textAlign}
    >
      <div>
        <Stack spacing={1} pb={3}>
          {branding && <Box pb={{ xs: 4, md: 7 }}>{branding}</Box>}
          {subtitle && (
            <Typography variant="body1" fontWeight="bold" color="primary">
              {subtitle}
            </Typography>
          )}
          {title && (
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {title}
            </Typography>
          )}
        </Stack>
        {description && (
          <Typography variant="body1" color="text.primary">
            {description}
          </Typography>
        )}
      </div>
      {children && <Group>{children}</Group>}
    </Stack>
  );
}

export default Billboard;
export type { BillboardProps };
