import { CssBaseline } from '@mui/material';
import { ptBR } from '@mui/material/locale';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CenteredSpinner } from '@peapods/material';
import { preset } from '@peapods/preset-material';
import { type PropsWithChildren, Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import Layout from './layouts/dashboard';
import { ThemeSwitcherProvider, useThemeMode } from './stores/theme-switcher';

const WelcomePage = lazy(() => import('./pages/welcome'));

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <WelcomePage />,
          },
        ],
      },
    ],
  },
]);

const ThemeProviderWrapper = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={createTheme(preset({ mode }), ptBR)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const Main = () => {
  return (
    <ThemeSwitcherProvider>
      <ThemeProviderWrapper>
        <Suspense fallback={<CenteredSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProviderWrapper>
    </ThemeSwitcherProvider>
  );
};

export default Main;
