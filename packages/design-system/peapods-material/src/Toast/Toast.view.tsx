import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import SnackbarContent, {
  type SnackbarContentProps,
} from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import type { SvgIconOwnProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { darken, lighten, styled } from '@mui/material/styles';
import type { ReactElement } from 'react';
import React, { forwardRef } from 'react';
import CheckCircleOutlined from '../internal/svg-icons/CheckCircleOutlined';
import CloseOutlined from '../internal/svg-icons/CloseOutlined';
import ErrorOutlineOutlined from '../internal/svg-icons/ErrorOutlineOutlined';
import InfoOutlined from '../internal/svg-icons/InfoOutlined';
import ReportProblemOutlined from '../internal/svg-icons/ReportProblemOutlined';

const ToastRoot = styled(SnackbarContent, {
  name: 'MuiToast',
  slot: 'Root',
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'loading' && prop !== 'sx',
})(({ theme }) => {
  const bgcolor = theme.palette.mode === 'light' ? lighten : darken;
  return {
    maxWidth: '600px',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    backgroundColor: bgcolor(theme.palette.secondary.main, 0.9),
    color: theme.palette.text.primary,
    borderColor: theme.palette.secondary.main,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderStyle: 'solid',
    variants: [
      {
        props: { color: 'error' },
        style: {
          backgroundColor: bgcolor(theme.palette.error.main, 0.9),
          borderColor: theme.palette.error.main,
        },
      },
      {
        props: { color: 'success' },
        style: {
          backgroundColor: bgcolor(theme.palette.success.main, 0.9),
          borderColor: theme.palette.success.main,
        },
      },
      {
        props: { color: 'warning' },
        style: {
          backgroundColor: bgcolor(theme.palette.warning.main, 0.9),
          borderColor: theme.palette.warning.main,
        },
      },
      {
        props: { color: 'info' },
        style: {
          backgroundColor: bgcolor(theme.palette.info.main, 0.9),
          borderColor: theme.palette.info.main,
        },
      },
    ],
  };
});

const icons = {
  action: <InfoOutlined />,
  success: <CheckCircleOutlined />,
  warning: <ReportProblemOutlined />,
  error: <ErrorOutlineOutlined />,
  info: <InfoOutlined />,
};

type Color = 'error' | 'success' | 'warning' | 'info';

type ToastCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

type CloseReason = 'toggle' | 'blur' | 'mouseLeave' | 'escapeKeyDown';

type OpenReason = 'toggle' | 'focus' | 'mouseEnter';

interface ToastProps extends SnackbarContentProps {
  /**
   * The title of the toast.
   */
  title?: string;
  /**
   * The message of the toast.
   */
  message: string;
  /**
   * The icon of the toast.
   */
  icon?: ReactElement<SvgIconOwnProps>;
  /**
   * The action of the toast.
   */
  onAction?: () => void;
  /**
   * The callback function to close the toast.
   */
  onClose?: (
    event: React.SyntheticEvent | Event,
    reason?: ToastCloseReason,
  ) => void;
  /**
   * The text of the action button.
   */
  actionText?: string;
  /**
   * The text of the close button.
   */
  closeText?: string;
  /**
   * The color of the toast.
   */
  color?: Color;
  /**
   * Whether the toast is loading.
   */
  loading?: boolean;
}

interface IconProps extends SvgIconOwnProps {
  element?: ReactElement<SvgIconOwnProps>;
  color?: Color | 'action';
}

/**
 * The icon component for the toast.
 */
const Icon = ({ element, color, ...rest }: IconProps) => {
  const slotProps = { color, ...rest };

  if (element && React.isValidElement(element)) {
    return React.cloneElement(element, slotProps);
  }

  const check = color && color in icons;
  return check ? React.cloneElement(icons[color], slotProps) : null;
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    title,
    message,
    onAction,
    onClose,
    color,
    icon,
    actionText = 'Desfazer',
    closeText = 'Fechar',
    loading = false,
    ...props
  },
  ref,
) {
  const action = (
    <React.Fragment>
      {onAction ? (
        <Button color={color} variant="text" size="small" onClick={onAction}>
          {actionText}
        </Button>
      ) : null}
      <IconButton
        size="small"
        aria-label={closeText}
        color="inherit"
        onClick={(event) => onClose?.(event)}
      >
        <CloseOutlined fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Message = () => (
    <Stack direction="row" spacing={2} alignItems="start">
      <Stack width={20} height={20} alignItems="center">
        {loading ? (
          <CircularProgress color={color} size={20} />
        ) : (
          <Icon fontSize="small" element={icon} color={color ?? 'action'} />
        )}
      </Stack>
      <div>
        {title && <Typography variant="subtitle2">{title}</Typography>}
        <Typography variant="body2">{message}</Typography>
      </div>
    </Stack>
  );

  return (
    <>
      <ToastRoot
        role="alert"
        color={color}
        message={<Message />}
        action={action}
        {...props}
        ref={ref}
      />
    </>
  );
});

export default Toast;
export type { ToastProps, ToastCloseReason, CloseReason, OpenReason };
