const history = new Set<string>();

/**
 * Warns only once for a specific message.
 * @param msg The message to warn.
 */
export default function warnOnce(msg: string) {
  const processEnv =
    typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
  if (processEnv && !history.has(msg)) {
    history.add(msg);
    console.warn(msg);
  }
}
