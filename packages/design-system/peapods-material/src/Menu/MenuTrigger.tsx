import { Children, cloneElement, isValidElement } from 'react';
import type { FC, MouseEvent, PropsWithChildren, ReactElement } from 'react';
import { useMenuDropdown } from './MenuProvider';

const MenuTrigger: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useMenuDropdown();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    ctx.setVisibility(true, event.currentTarget);
  };

  if (isValidElement(children)) {
    // biome-ignore lint/suspicious/noExplicitAny: safe to cast, we know it's a valid element
    return cloneElement(Children.only(children as ReactElement<any>), {
      ...(children.props as object),
      onClick: handleClick,
    });
  }

  return null;
};

export default MenuTrigger;
