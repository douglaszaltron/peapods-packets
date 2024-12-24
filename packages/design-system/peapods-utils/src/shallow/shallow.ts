type HasEntries = {
  entries(): Iterable<[unknown, unknown]>;
};

/**
 * Checks if an object is iterable
 */
const isIterable = (obj: unknown): obj is Iterable<unknown> =>
  obj != null && typeof obj === 'object' && Symbol.iterator in obj;

/**
 * Checks if a value has an iterable entries() method
 */
const hasIterableEntries = (
  value: Iterable<unknown>,
): value is Iterable<unknown> & HasEntries =>
  value != null && typeof value === 'object' && 'entries' in value;

/**
 * Compares two data structures that have entries()
 */
const compareEntries = (valueA: HasEntries, valueB: HasEntries): boolean => {
  try {
    const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
    const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());

    if (mapA.size !== mapB.size) {
      return false;
    }

    return Array.from(mapA.entries()).every(([key, value]) =>
      Object.is(value, mapB.get(key)),
    );
  } catch {
    return false;
  }
};

/**
 * Compares two iterable structures
 */
const compareIterables = (
  valueA: Iterable<unknown>,
  valueB: Iterable<unknown>,
): boolean => {
  try {
    const iteratorA = valueA[Symbol.iterator]();
    const iteratorB = valueB[Symbol.iterator]();

    while (true) {
      const nextA = iteratorA.next();
      const nextB = iteratorB.next();

      if (nextA.done && nextB.done) return true;
      if (nextA.done || nextB.done) return false;
      if (!Object.is(nextA.value, nextB.value)) return false;
    }
  } catch {
    return false;
  }
};

/**
 * Performs a shallow comparison between two values
 * @param valueA First value to be compared
 * @param valueB Second value to be compared
 * @returns true if the values are superficially equal
 */
export default function shallow<T>(valueA: T, valueB: T): boolean {
  if (Object.is(valueA, valueB)) {
    return true;
  }

  if (
    typeof valueA !== 'object' ||
    valueA === null ||
    typeof valueB !== 'object' ||
    valueB === null
  ) {
    return false;
  }

  try {
    if (!isIterable(valueA) || !isIterable(valueB)) {
      return compareEntries(
        { entries: () => Object.entries(valueA as object) },
        { entries: () => Object.entries(valueB as object) },
      );
    }

    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }

    return compareIterables(valueA, valueB);
  } catch {
    return false;
  }
}
