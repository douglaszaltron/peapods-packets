import gradient from 'gradient-string';
import color from 'picocolors';
import { LOG_MESSAGES, LOG_TYPES, RAINBOW_COLORS } from './constants.mjs';
import { formatProgress } from './formatters.mjs';
import { LOG_STYLES } from './styles.mjs';

export const logger = {
  log(type, msg, extra) {
    const style = LOG_STYLES[type](msg, extra);
    console.log(style.color(style.symbol), style.text);
  },

  info(msg) {
    this.log(LOG_TYPES.SYSTEM.INFO, msg);
  },

  error(msg, error) {
    this.log(LOG_TYPES.SYSTEM.ERROR, msg, error);
  },

  warn(msg) {
    this.log(LOG_TYPES.SYSTEM.WARNING, msg);
  },

  success(msg, duration) {
    this.log(LOG_TYPES.PROCESS.SUCCESS, msg, duration);
  },

  pending(msg) {
    this.log(LOG_TYPES.PROCESS.PENDING, msg);
  },

  cache(msg) {
    this.log(LOG_TYPES.UI.CACHE, msg);
  },

  progress(current, total) {
    const message = `\r${formatProgress(current, total)} ${LOG_MESSAGES.PROCESSING}`;
    process.stdout.write(message);
  },

  hero(msg) {
    const coloredText = gradient(RAINBOW_COLORS)(msg);
    console.log(color.bold(coloredText));
  },
};
