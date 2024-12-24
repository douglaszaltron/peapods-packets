import GridRowOverlay, { type GridRowOverlayProps } from '../GridRowOverlay';
import SearchOffOutlined from '../internal/svg-icons/SearchOffOutlined';

export type GridRowNoItemFoundProps = GridRowOverlayProps;

export default function GridRowNoItemFound({
  colSpan,
  icon = SearchOffOutlined,
  message = 'Nenhum item encontrado',
  helpText = 'Tente ajustar os filtros ou termos da sua busca.',
}: GridRowNoItemFoundProps) {
  return (
    <GridRowOverlay
      colSpan={colSpan}
      helpText={helpText}
      icon={icon}
      message={message}
    />
  );
}
