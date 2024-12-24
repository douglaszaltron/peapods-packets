import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MenuDropdown, { type MenuDropdownProps } from '../MenuDropdown';
import MenuProvider from '../MenuProvider';
import MenuTrigger from '../MenuTrigger';

const renderMenuDropdown = (props?: Partial<MenuDropdownProps>) => {
  return render(
    <MenuProvider>
      <MenuTrigger>
        <button type="button">Open Menu</button>
      </MenuTrigger>
      <MenuDropdown {...props}>
        <li data-testid="menu-item">Menu Item</li>
      </MenuDropdown>
    </MenuProvider>,
  );
};

describe('MenuDropdown', () => {
  it('should render the menu items when visible', () => {
    renderMenuDropdown();

    const triggerButton = screen.getByText('Open Menu');
    fireEvent.click(triggerButton);

    const menuItem = screen.getByTestId('menu-item');
    expect(menuItem).toBeInTheDocument();
  });

  it('should close the menu when clicking outside if keepPopoverOpen is false', () => {
    renderMenuDropdown({ keepPopoverOpen: false });

    const triggerButton = screen.getByText('Open Menu');
    fireEvent.click(triggerButton);

    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();

    const menuItem = screen.getByTestId('menu-item');
    fireEvent.click(menuItem);

    expect(menu).not.toBeVisible();
  });

  it('should not close the menu when clicking outside if keepPopoverOpen is true', () => {
    renderMenuDropdown({ keepPopoverOpen: true });

    const triggerButton = screen.getByText('Open Menu');
    fireEvent.click(triggerButton);

    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();

    const menuItem = screen.getByTestId('menu-item');
    fireEvent.click(menuItem);

    expect(menu).toBeVisible();
  });

  it('calls the onClick function when the menu is clicked', () => {
    const handleClick = vi.fn();
    renderMenuDropdown({ onClick: handleClick });

    const triggerButton = screen.getByText('Open Menu');
    fireEvent.click(triggerButton);

    const menu = screen.getByRole('menu');
    fireEvent.click(menu);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
