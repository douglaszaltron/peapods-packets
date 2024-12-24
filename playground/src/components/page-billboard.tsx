import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import React, { type SVGProps } from 'react';
import Billboard from './billboard';

interface ImageProps extends SVGProps<SVGSVGElement> {
  source: React.ReactElement;
}

interface PageBillboardProps {
  image: React.ReactElement;
  title: string;
  subtitle?: string;
  branding?: React.ReactNode;
  children?: React.ReactNode;
  description?: React.ReactNode;
}

const Image = ({ source, ...rest }: ImageProps) => {
  return source && React.isValidElement(source)
    ? React.cloneElement(source, rest)
    : null;
};

function PageBillboard({
  title,
  subtitle,
  description,
  branding,
  children,
  image,
}: PageBillboardProps) {
  return (
    <Grid
      container
      width="100%"
      spacing={4}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column-reverse', md: 'row' }}
      flexWrap="nowrap"
    >
      <Grid maxWidth={{ xs: '100%', md: '400px' }}>
        <Billboard
          branding={branding}
          subtitle={subtitle}
          title={title}
          description={description}
        >
          {children}
        </Billboard>
      </Grid>
      {image && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack alignItems="center" width="100%">
            <Image source={image} width="100%" height="100%" />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default PageBillboard;
export type { PageBillboardProps };
