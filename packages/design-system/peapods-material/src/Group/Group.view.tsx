import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import type { StackOwnProps } from '@mui/material/Stack';
import { type SxProps, type Theme, styled } from '@mui/material/styles';
import * as React from 'react';
import { Children, cloneElement, isValidElement, useMemo } from 'react';

interface SlotProps {
  direction?: 'row' | 'column';
  attached?: boolean;
  grow?: boolean;
}

const shouldForwardProp = (prop: string) => {
  return !['attached', 'grow', 'divider'].includes(prop);
};

const GroupSlot = styled('div', {
  name: 'MuiGroup',
  slot: 'Root',
  shouldForwardProp,
})<SlotProps>(({ theme, direction = 'row' }) => {
  return {
    display: 'inline-flex',
    gap: theme.spacing(1),
    isolation: 'isolate',
    position: 'relative',
    '& [data-group-item]': {
      '&:focus-visible': {
        zIndex: 1,
      },
    },
    variants: [
      {
        props: { direction: 'row' },
        style: {
          flexDirection: 'row',
        },
      },
      {
        props: { direction: 'column' },
        style: {
          flexDirection: 'column',
        },
      },
      {
        props: { grow: true },
        style: {
          display: 'flex',
          '& > *': {
            flex: 1,
          },
        },
      },
      {
        props: { divider: true },
        style: {
          gap: 1,
        },
      },
      {
        props: { attached: true },
        style: {
          gap: 0,
          '& > *[data-first]': {
            ...(direction === 'row' && {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              marginRight: -1,
            }),
            ...(direction === 'column' && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              marginBottom: -1,
            }),

            [`& > .${outlinedInputClasses.root}`]: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
          '& > *[data-between]': {
            borderRadius: 0,

            ...(direction === 'row' && {
              marginRight: -1,
            }),
            ...(direction === 'column' && {
              marginBottom: -1,
            }),

            [`& > .${outlinedInputClasses.root}`]: {
              borderRadius: 0,
            },
          },
          '& > *[data-last]': {
            ...(direction === 'row' && {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }),
            ...(direction === 'column' && {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }),

            [`& > .${outlinedInputClasses.root}`]: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          },
        },
      },
    ],
  };
});

interface GroupProps {
  alignItems?: StackOwnProps['alignItems'];
  attached?: boolean;
  children: React.ReactNode;
  direction?: 'row' | 'column';
  flexWrap?: StackOwnProps['flexWrap'];
  grow?: boolean;
  justifyContent?: StackOwnProps['justifyContent'];
  sx?: SxProps<Theme>;
}

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  function Group(props, ref) {
    const {
      children,
      direction = 'row',
      attached,
      grow,
      alignItems,
      justifyContent,
      flexWrap,
      sx,
      ...rest
    } = props;

    const count = Children.count(children);

    const _children = useMemo(() => {
      const childArray = Children.toArray(children).filter(
        isValidElement,
      ) as React.ReactElement[];

      return childArray.map((child, index) => {
        // biome-ignore lint/suspicious/noExplicitAny: safe to cast, we know it's a valid element
        const childProps = child.props as any;
        return cloneElement(child, {
          ...childProps,
          'data-group-item': '',
          'data-first': index === 0 ? '' : undefined,
          'data-last': index === count - 1 ? '' : undefined,
          'data-between': index > 0 && index < count - 1 ? '' : undefined,
        });
      });
    }, [children, count]);

    return (
      <GroupSlot
        ref={ref}
        direction={direction}
        attached={attached}
        grow={grow}
        sx={{ ...sx, alignItems, justifyContent, flexWrap }}
        {...rest}
      >
        {_children}
      </GroupSlot>
    );
  },
);

export default Group;
export type { GroupProps };
