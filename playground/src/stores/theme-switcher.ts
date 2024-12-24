import {
  createStore,
  createStoreProvider,
  useLocalStorageState,
  useStore,
} from '@peapods/utils';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const THEME_STORAGE_KEY = 'peapods-mode';

const DEFAULT_THEME: ThemeMode = 'light';

const store = createStore<ThemeState>(() => ({ mode: DEFAULT_THEME }));

export const ThemeSwitcherProvider = createStoreProvider(store);

export const useThemeMode = () => {
  const [stored] = useLocalStorageState<ThemeMode>(
    THEME_STORAGE_KEY,
    DEFAULT_THEME,
  );

  const mode: ThemeMode = stored ?? DEFAULT_THEME;
  return useStore(() => ({ mode }));
};

export const useThemeToggle = () => {
  const [mode, setMode] = useLocalStorageState(
    THEME_STORAGE_KEY,
    DEFAULT_THEME,
  );

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return { mode, toggleTheme };
};
