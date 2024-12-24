import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import { useCallback } from 'react';
import type { FC, MouseEvent, PropsWithChildren } from 'react';
import { useMenuDropdown } from './MenuProvider';

type MenuDropdownProps = {
  /**
   * When set to true, the `keepPopoverOpen` property prevents the popover from closing
   * when a menu item is clicked. If set to false, the popover will close as usual
   * upon clicking a menu item.
   */
  keepPopoverOpen?: boolean;
} & Omit<MenuProps, 'open'>;

const MenuDropdown: FC<PropsWithChildren<MenuDropdownProps>> = ({
  keepPopoverOpen = false,
  children,
  onClick,
  ...rest
}) => {
  const { visible, setVisibility, anchorEl } = useMenuDropdown();

  const handleClose = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!keepPopoverOpen) {
        handleClose();
      }
      if (onClick) {
        onClick(event);
      }
    },
    [keepPopoverOpen, handleClose, onClick],
  );

  return (
    <Menu
      {...rest}
      open={visible}
      anchorEl={anchorEl}
      onClose={handleClose}
      onClick={handleClick}
    >
      {children}
    </Menu>
  );
};

export default MenuDropdown;
export type { MenuDropdownProps };
