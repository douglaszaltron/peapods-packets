import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { FC, PropsWithChildren } from 'react';

type MenuContextProps = {
  /**
   * Indicates whether the component should be visible to the user.
   */
  visible: boolean;
  /**
   * Reference to the control element, used to position the menu.
   */
  anchorEl?: HTMLElement;
  /**
   * Function to control the visibility of the component.
   */
  setVisibility: (value: boolean, anchorEl?: HTMLElement) => void;
};

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

const useMenuDropdown = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuDropdown must be used within a MenuProvider');
  }
  return context;
};

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const setVisibility = useCallback(
    (value: boolean, anchorElement?: HTMLElement) => {
      setVisible(value);
      setAnchorEl(anchorElement || null);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      visible,
      anchorEl: anchorEl || undefined,
      setVisibility,
    }),
    [visible, anchorEl, setVisibility],
  );

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export default MenuProvider;
export { useMenuDropdown };
export type { MenuContextProps };
