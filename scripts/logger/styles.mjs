import color from 'picocolors';
import { LOG_SYMBOLS } from './constants.mjs';
import { formatCache, formatDuration, formatError } from './formatters.mjs';

export const LOG_STYLES = {
  info: (msg) => ({
    symbol: LOG_SYMBOLS.INFO,
    color: color.blue,
    text: msg,
  }),

  error: (msg, error) => ({
    symbol: LOG_SYMBOLS.ERROR,
    color: color.red,
    text: formatError(msg, error),
  }),

  warning: (msg) => ({
    symbol: LOG_SYMBOLS.WARNING,
    color: color.yellow,
    text: msg,
  }),

  success: (msg, duration) => ({
    symbol: LOG_SYMBOLS.SUCCESS,
    color: color.green,
    text: `${msg}${formatDuration(duration)}`,
  }),

  pending: (msg) => ({
    symbol: LOG_SYMBOLS.PENDING,
    color: color.cyan,
    text: msg,
  }),

  cache: (msg) => ({
    symbol: LOG_SYMBOLS.PENDING,
    color: color.cyan,
    text: formatCache(msg),
  }),
};
