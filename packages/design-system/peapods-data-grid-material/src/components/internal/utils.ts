import type { Column } from '@tanstack/react-table';

export const getPinnedPositions = <D, V>(column: Column<D, V>) => {
  return {
    minWidth: `${column.getSize()}px`,
    isLastLeftPinnedColumn:
      column.getIsPinned() === 'left' && column.getIsLastColumn('left'),
    isFirstRightPinnedColumn:
      column.getIsPinned() === 'right' && column.getIsFirstColumn('right'),
    leftPinnedWidth:
      column.getIsPinned() === 'left' ? `${column.getStart()}px` : undefined,
    rightPinnedWidth:
      column.getIsPinned() === 'right' ? `${column.getAfter()}px` : undefined,
  };
};

export const visuallyHidden: React.CSSProperties = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

export const getColumnWidth = <D, V>(column: Column<D, V>) => {
  const isPinned = column.getIsPinned();

  if (isPinned) {
    return column.getSize();
  }

  return undefined;
};
