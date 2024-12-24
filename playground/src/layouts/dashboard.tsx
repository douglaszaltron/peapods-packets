import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, Outlet } from 'react-router';
import PeapodsIcon from '../components/peapods-icon';
import { useThemeToggle } from '../stores/theme-switcher';

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeToggle();
  return (
    <Tooltip title={`Change to ${mode === 'light' ? 'dark' : 'light'}`}>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Layout() {
  return (
    <>
      <AppBar position="static" color="default" sx={{ position: 'relative' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ButtonBase to="/" component={Link}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PeapodsIcon fontSize="large" />
                <Typography variant="h6">peapods</Typography>
              </Stack>
            </ButtonBase>
          </Box>
          <ThemeToggle />
        </Toolbar>
        <Box
          sx={{
            zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '56px',
            opacity: 0.24,
            background:
              'linear-gradient(90deg, #2ECE71 0%, #33E686 25%, #00E1D3 50%, #00C9D1 75%, #83f35d 100%)',
            filter: 'blur(24px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            zIndex: 1,
            background:
              'linear-gradient(90deg, #2ECE71 0%, #33E686 25%, #00E1D3 50%, #00C9D1 75%, #83f35d 100%)',
          }}
        />
      </AppBar>
      <Container disableGutters={false}>
        <Outlet />
      </Container>
    </>
  );
}
