import type {
  Components,
  PaletteColor,
  PaletteMode,
  Shadows,
  Theme,
} from '@mui/material/styles';
import base from '@peapods/preset-base';

const { colors, fontFamily } = base;

const shadows = [
  'none',
  base.shadows.default,
  base.shadows.xs,
  base.shadows.sm,
  base.shadows.md,
  base.shadows.lg,
  base.shadows.xl,
  base.shadows['2xl'],
  base.shadows.default,
].concat(Array(16).fill('none')) as Shadows;

const variantColor = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
] as const;

type VariantColor = (typeof variantColor)[number];

export interface DesignTokensOptions {
  mode?: PaletteMode;
  fontSize?: number;
  htmlFontSize?: number;
}

export const getDesignTokens = (props?: DesignTokensOptions) => {
  const { mode = 'light', fontSize = 14, htmlFontSize = 16 } = props ?? {};

  const coefficient = fontSize / 14;
  const pxToRem = (size: number) => `${(size / htmlFontSize) * coefficient}rem`;

  return {
    palette: {
      primary: {
        light: colors.green[400],
        main: colors.green[500],
        dark: colors.green[600],
      },
      secondary: {
        light: colors.neutral[400],
        main: colors.neutral[500],
        dark: colors.neutral[600],
        ...(mode === 'dark' && {
          light: colors.neutral[50],
          main: colors.neutral[200],
          dark: colors.neutral[300],
          contrastText: colors.neutral[700],
        }),
      },
      grey: {
        50: colors.neutral[50],
        100: colors.neutral[100],
        200: colors.neutral[200],
        300: colors.neutral[300],
        400: colors.neutral[400],
        500: colors.neutral[500],
        600: colors.neutral[600],
        700: colors.neutral[700],
        800: colors.neutral[800],
        900: colors.neutral[900],
      },
      divider: mode === 'dark' ? colors.neutral[700] : colors.neutral[300],
      mode,
      background: {
        default: colors.neutral[100],
        paper: colors.neutral[50],
        ...(mode === 'dark' && {
          default: colors.neutral[900],
          paper: colors.neutral[800],
        }),
      },
      common: {
        black: colors.base.black,
        white: colors.base.white,
      },
      action: {
        disabledBackground: colors.neutral[100],
        ...(mode === 'dark' && {
          disabledBackground: colors.neutral[900],
        }),
      },
      text: {
        primary: colors.neutral[700],
        secondary: colors.neutral[500],
        disabled: colors.neutral[300],
        ...(mode === 'dark' && {
          primary: colors.neutral[200],
          secondary: colors.neutral[400],
          disabled: colors.neutral[800],
        }),
      },
    },
    shape: {
      borderRadius: 6,
    },
    shadows,
    typography: {
      htmlFontSize,
      fontFamily: fontFamily.sans,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontWeight: 600,
        fontSize: pxToRem(55),
        lineHeight: pxToRem(62),
        letterSpacing: pxToRem(0),
      },
      h2: {
        fontWeight: 600,
        fontSize: pxToRem(44),
        lineHeight: pxToRem(50),
        letterSpacing: pxToRem(0),
      },
      h3: {
        fontWeight: 600,
        fontSize: pxToRem(35),
        lineHeight: pxToRem(40),
        letterSpacing: pxToRem(0),
      },
      h4: {
        fontWeight: 600,
        fontSize: pxToRem(28),
        lineHeight: pxToRem(32),
        letterSpacing: pxToRem(0),
      },
      h5: {
        fontWeight: 600,
        fontSize: pxToRem(22),
        lineHeight: pxToRem(28),
        letterSpacing: pxToRem(0),
      },
      h6: {
        fontWeight: 600,
        fontSize: pxToRem(20),
        lineHeight: pxToRem(26),
        letterSpacing: pxToRem(0),
      },
      button: {
        fontSize: pxToRem(14),
        lineHeight: pxToRem(16),
        fontWeight: 500,
        letterSpacing: 0,
        textTransform: 'initial',
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24),
        letterSpacing: pxToRem(0.15),
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: pxToRem(14),
        lineHeight: pxToRem(24),
        letterSpacing: pxToRem(0.1),
      },
      body1: {
        fontWeight: 400,
        fontSize: pxToRem(16),
        lineHeight: pxToRem(24),
        letterSpacing: pxToRem(0.5),
      },
      body2: {
        fontWeight: 400,
        fontSize: pxToRem(14),
        lineHeight: pxToRem(20),
        letterSpacing: pxToRem(0.25),
      },
      caption: {
        fontWeight: 400,
        fontSize: pxToRem(12),
        lineHeight: pxToRem(16),
        letterSpacing: pxToRem(0.4),
      },
      overline: {
        fontWeight: 400,
        fontSize: pxToRem(10),
        lineHeight: pxToRem(16),
        letterSpacing: pxToRem(1.5),
      },
    },
  } as const;
};

export const getComponents = () => {
  const components: Components<Theme> = {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => {
          const getButtonStyle = (color: VariantColor, variant: string) => {
            const paletteColor: PaletteColor = theme.palette[color];
            if (variant === 'contained') {
              return {
                ':hover': {
                  backgroundColor: paletteColor.light,
                },
                ':active': {
                  backgroundColor: paletteColor.dark,
                },
              };
            }
            if (variant === 'outlined') {
              return {
                backgroundColor: theme.palette.background.paper,
                ':hover': {
                  borderColor: paletteColor.light,
                  color: paletteColor.light,
                },
                ':active': {
                  borderColor: paletteColor.dark,
                  color: paletteColor.dark,
                },
              };
            }
            return {
              ':hover': {
                color: paletteColor.light,
                backgroundColor: 'transparent',
              },
              ':active': {
                color: paletteColor.dark,
                backgroundColor: 'transparent',
              },
            };
          };

          const variants = variantColor.flatMap((color) =>
            ['contained', 'outlined', 'text'].map((variant) => ({
              props: { color, variant },
              style: getButtonStyle(color, variant),
            })),
          );

          return {
            fontSize: theme.typography.pxToRem(14),
            lineHeight: theme.typography.pxToRem(16),
            variants,
          };
        },
      },
    },
  };

  return { components };
};

export const preset = (props?: DesignTokensOptions) => ({
  ...getDesignTokens(props),
  ...getComponents(),
});
