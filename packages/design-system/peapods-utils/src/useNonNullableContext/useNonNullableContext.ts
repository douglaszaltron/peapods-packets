'use client';
import * as React from 'react';

/**
 * Consume a context but throw when used outside of a provider.
 */
export default function useNonNullableContext<T>(
  context: React.Context<T>,
  name?: string,
): NonNullable<T> {
  const maybeContext = React.useContext(context);
  if (maybeContext === null || maybeContext === undefined) {
    throw new Error(`context "${name}" was used without a Provider`);
  }
  return maybeContext;
}
