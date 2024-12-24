import GridRowOverlay, { type GridRowOverlayProps } from '../GridRowOverlay';
import ErrorOutlineOutlined from '../internal/svg-icons/ErrorOutlineOutlined';

export type GridRowErrorProps = GridRowOverlayProps;

export default function GridRowError({
  colSpan,
  icon = ErrorOutlineOutlined,
  message = 'Não foi possível carregar os dados',
  helpText = 'Atualize a página ou tente novamente em alguns instantes.',
}: GridRowErrorProps) {
  return (
    <GridRowOverlay
      colSpan={colSpan}
      helpText={helpText}
      icon={icon}
      message={message}
    />
  );
}
