import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import CloseOutlined from '../internal/svg-icons/CloseOutlined';

type ActionEvent = (event: React.MouseEvent<HTMLButtonElement>) => void;

type Locale = {
  close?: string;
  skip?: string;
  previous?: string;
  next?: string;
  last?: string;
  of?: string;
};

type Steps = {
  index: number;
  size: number;
};

interface CoachMarkProps {
  locale?: Locale;
  title: React.ReactNode;
  content: React.ReactNode;
  hideBackButton?: boolean;
  hideCloseButton?: boolean;
  showSkipButton?: boolean;
  showProgress?: boolean;
  onClose?: ActionEvent;
  onNext?: ActionEvent;
  onPrevious?: ActionEvent;
  onSkip?: ActionEvent;
  steps?: Steps;
  sx?: SxProps<Theme>;
}

const defaultLocale: Locale = {
  close: 'Fechar',
  skip: 'Pular',
  previous: 'Anterior',
  next: 'Próximo',
  last: 'Finalizar',
  of: 'de',
};

const defaultProps = {
  locale: defaultLocale,
  hideBackButton: false,
  hideCloseButton: false,
  showSkipButton: false,
  showProgress: true,
};

interface CardHeaderProps {
  title: React.ReactNode;
  locale: Pick<Locale, 'close'>;
  hideCloseButton?: boolean;
  onClose?: ActionEvent;
}

function CardHeader({
  title,
  locale,
  hideCloseButton,
  onClose,
}: CardHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="subtitle1" noWrap id="spotlight-Card-title">
        {title}
      </Typography>
      {!hideCloseButton && (
        <Tooltip title={locale.close}>
          <IconButton size="small" onClick={onClose} aria-label={locale.close}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

interface CardContentProps {
  content: React.ReactNode;
}

function CardContent({ content }: CardContentProps) {
  return (
    <Typography variant="body2" id="spotlight-Card-content">
      {content}
    </Typography>
  );
}

interface NavigationButtonsProps {
  steps?: Steps;
  locale: Locale;
  hideBackButton?: boolean;
  showSkipButton?: boolean;
  showProgress?: boolean;
  onNext?: ActionEvent;
  onPrevious?: ActionEvent;
  onSkip?: ActionEvent;
}

function NavigationButtons({
  steps,
  locale,
  hideBackButton,
  showSkipButton,
  showProgress,
  onNext,
  onPrevious,
  onSkip,
}: NavigationButtonsProps) {
  const { index = 0, size = 0 } = steps || {};
  const isFirstStep = index <= 1;
  const isLastStep = index === size;
  const showProgressInfo = showProgress && !showSkipButton;
  const shouldShowProgressText = showProgress && showSkipButton && !isLastStep;
  const shouldAlignFlexEnd = !showSkipButton && !showProgress;
  const shouldShowBackButton = !isFirstStep && !hideBackButton;
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent={shouldAlignFlexEnd ? 'flex-end' : 'space-between'}
    >
      {showProgressInfo && (
        <Stack direction="row" spacing={0.5}>
          <Typography variant="caption">{index}</Typography>
          <Typography variant="caption">{locale.of}</Typography>
          <Typography variant="caption">{size}</Typography>
        </Stack>
      )}
      {showSkipButton && (
        <Button
          variant="outlined"
          size="small"
          onClick={onSkip}
          aria-label={locale.skip}
        >
          {locale.skip}
        </Button>
      )}
      <Stack direction="row" spacing={2}>
        {shouldShowBackButton && (
          <Button
            variant="text"
            size="small"
            onClick={onPrevious}
            aria-label={locale.previous}
          >
            {locale.previous}
          </Button>
        )}

        <Button
          variant="contained"
          size="small"
          onClick={onNext}
          aria-label={isLastStep ? locale.last : locale.next}
        >
          {isLastStep ? locale.last : locale.next}
          {shouldShowProgressText && ` ${index} / ${size}`}
        </Button>
      </Stack>
    </Stack>
  );
}

function CoachMark(props: CoachMarkProps) {
  const {
    title,
    content,
    steps,
    hideBackButton,
    hideCloseButton,
    showSkipButton,
    showProgress,
    onClose,
    onNext,
    onPrevious,
    onSkip,
    sx,
  } = { ...defaultProps, ...props };
  const locale = { ...defaultLocale, ...props.locale };
  return (
    <Paper sx={sx}>
      <Stack spacing={3} p={2}>
        <Stack>
          <Stack spacing={1}>
            <CardHeader
              title={title}
              locale={locale}
              hideCloseButton={hideCloseButton}
              onClose={onClose}
            />
            <CardContent content={content} />
          </Stack>
        </Stack>
        <NavigationButtons
          steps={steps}
          locale={locale}
          hideBackButton={hideBackButton}
          showSkipButton={showSkipButton}
          showProgress={showProgress}
          onNext={onNext}
          onPrevious={onPrevious}
          onSkip={onSkip}
        />
      </Stack>
    </Paper>
  );
}

export default CoachMark;
export type { CoachMarkProps };
