import color from 'picocolors';

export const formatDuration = (duration) => {
  return duration ? color.gray(` [${duration}ms]`) : '';
};

export const formatProgress = (current, total) => {
  return `${color.gray(`[${current}/${total}]`)} ${color.cyan('⋯')}`;
};

export const formatError = (message, error) => {
  return `${message}${error ? `\n${error.stack || error}` : ''}`;
};

export const formatCache = (message) => {
  return `${message} ${color.gray('(from cache)')}`;
};
