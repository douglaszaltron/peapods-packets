import CardActionArea from '@mui/material/CardActionArea';
import type { CardActionAreaOwnProps } from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import type { SvgIconOwnProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { warnOnce } from '@peapods/utils';
import * as React from 'react';
import Surface from '../Surface';
import Tag from '../Tag';
import FilterListOutlined from '../internal/svg-icons/FilterListOutlined';
import UnfoldMoreOutlined from '../internal/svg-icons/UnfoldMoreOutlined';

interface FilterCardProps extends CardActionAreaOwnProps {
  /**
   * The label of the filter card.
   */
  label: string;
  /**
   * The value of the filter card.
   */
  value?: string | string[];
  /**
   * Whether the filter card is dense.
   */
  dense?: boolean;
  /**
   * The icon of the filter card.
   */
  icon?: React.ReactElement<SvgIconOwnProps> | false;
  /**
   * The limit of tags.
   */
  limitTags?: number;
  /**
   * Whether the filter card is disabled.
   */
  disabled?: boolean;
}

interface TagListProps {
  value?: string | string[];
  limitTags?: number;
  dense?: boolean;
}

interface LabelWithTagsProps {
  label: string;
  value?: string | string[];
  limitTags?: number;
  dense?: boolean;
}

interface IconProps extends SvgIconOwnProps {
  element?: React.ReactElement<SvgIconOwnProps>;
}

const Icon = ({ element, ...rest }: IconProps) => {
  if (element && React.isValidElement(element)) {
    return React.cloneElement(element, { color: 'primary', ...rest });
  }
  return null;
};

const Text = ({
  children,
  dense,
}: React.PropsWithChildren<{ dense?: boolean }>) => (
  <Typography variant={dense ? 'body2' : 'body1'} fontWeight="medium" noWrap>
    {children}
  </Typography>
);

const LabelWithTags: React.FC<LabelWithTagsProps> = ({
  label,
  value,
  limitTags,
  dense,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Text dense={dense}>{label}</Text>
      <TagList value={value} limitTags={limitTags} dense={dense} />
    </Stack>
  );
};

const TagList: React.FC<TagListProps> = ({ value, limitTags = 1, dense }) => {
  if (!value) return null;

  const tagsToShow = Array.isArray(value) ? value.slice(0, limitTags) : [value];
  const showMoreCount = Array.isArray(value) ? value.length - limitTags : 0;

  return (
    <>
      <Divider orientation="vertical" sx={{ height: 20 }} />
      {tagsToShow.map((item) => (
        <Tag key={item} label={item} />
      ))}
      {showMoreCount > 0 && <Text dense={dense}>+{showMoreCount}</Text>}
    </>
  );
};

const FilterCard: React.FC<FilterCardProps> = ({
  label,
  value,
  icon = <FilterListOutlined />,
  limitTags = 1,
  disabled = false,
  dense = false,
  ...rest
}) => {
  if (value && !Array.isArray(value) && typeof value !== 'string') {
    warnOnce(
      'The FilterCard `value` prop must be a string or an array of strings.',
    );
    return null;
  }

  const padding = dense ? 1 : 1.5;
  const height = dense ? 32 : 48;

  return (
    <Surface hovered dashed={!value} variant="outlined" disabled={disabled}>
      <CardActionArea {...rest}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          paddingBlock={0.5}
          paddingLeft={padding}
          paddingRight={padding}
          height={height}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {icon && <Icon element={icon} fontSize="small" />}
            <LabelWithTags
              label={label}
              value={value}
              limitTags={limitTags}
              dense={dense}
            />
          </Stack>
          <UnfoldMoreOutlined fontSize="small" color="action" />
        </Stack>
      </CardActionArea>
    </Surface>
  );
};

export default FilterCard;
export type { FilterCardProps };
