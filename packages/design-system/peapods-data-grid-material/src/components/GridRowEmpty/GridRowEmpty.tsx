import GridRowOverlay, { type GridRowOverlayProps } from '../GridRowOverlay';
import Package2Outlined from '../internal/svg-icons/Package2Outlined';

export type GridRowEmptyProps = GridRowOverlayProps;

export default function GridRowEmpty({
  colSpan,
  helpText,
  icon = Package2Outlined,
  message = 'Nenhum item encontrado',
}: GridRowEmptyProps) {
  return (
    <GridRowOverlay
      colSpan={colSpan}
      helpText={helpText}
      icon={icon}
      message={message}
    />
  );
}
