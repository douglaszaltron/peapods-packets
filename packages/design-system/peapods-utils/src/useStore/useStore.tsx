import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';
import shallow from '../shallow';

type SetStateFn<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

type GetStateFn<T> = () => T;

type Listener = () => void;

type EqualityFn<T> = (a: T, b: T) => boolean;

interface Store<T> {
  get: GetStateFn<T>;
  set: SetStateFn<T>;
  subscribe: (listener: Listener) => () => boolean;
}

type Initializer<T> = (set: SetStateFn<T>, get: GetStateFn<T>) => T;

export function createStore<T>(initializer: Initializer<T>): Store<T> {
  let state: T;
  const listeners = new Set<Listener>();

  const get: GetStateFn<T> = () => state;

  const set: SetStateFn<T> = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    for (const listener of listeners) {
      listener();
    }
  };

  state = initializer(set, get);

  return {
    get,
    set,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// biome-ignore lint/suspicious/noExplicitAny: safe
const StoreContext = createContext<Store<any> | null>(null);

export function createStoreProvider<T>(store: Store<T>) {
  return function Provider({ children }: PropsWithChildren) {
    const storeRef = useRef(store);

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  };
}

export default function useStore<T, Selected = T>(
  selector?: (state: T) => Selected,
  equalityFn: EqualityFn<Selected> = shallow,
): Selected {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You need to wrap your component with the Provider.');
  }

  const lastValueRef = useRef<Selected>(
    selector ? selector(store.get()) : store.get(),
  );

  const getCurrentValue = () => {
    const currentValue = selector ? selector(store.get()) : store.get();

    if (
      !lastValueRef.current ||
      !equalityFn(currentValue, lastValueRef.current)
    ) {
      lastValueRef.current = currentValue;
    }

    return lastValueRef.current;
  };

  return useSyncExternalStore(
    store.subscribe,
    getCurrentValue,
    getCurrentValue,
  );
}
