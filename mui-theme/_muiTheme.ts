import { PaletteMode } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles';
import { Inter, Manrope } from 'next/font/google';
import { defaultPalette } from './palettes/defaultPalette';

/**
 * The function `MuiThemeOptions` returns a configuration object for the Material-UI theme based on the
 * provided mode (light or dark) and includes customizations for various components and typography.
 * @param {PaletteMode} mode - The `mode` parameter is of type `PaletteMode` and is used to determine
 * the color palette mode for the theme. The `PaletteMode` type can have two possible values: "light"
 * or "dark".
 * @returns The function `MuiThemeOptions` returns a `ThemeOptions` object.
 */

export const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: defaultPalette(mode),
    typography: {
      fontFamily: [`${inter.style.fontFamily}`].join(','),
      h1: {
        fontSize: '42px',
        lineHeight: '1.1em',
        fontWeight: '700',
        fontFamily: `${manrope.style.fontFamily}`,
        '@media(max-width:899px)': {
          fontSize: '32px',
        },
        '@media(max-width:599px)': {
          fontSize: '28px',
        },
      },
      h2: {
        fontSize: '30px',
        lineHeight: '1.1em',
        fontWeight: '600',
        fontFamily: `${manrope.style.fontFamily}`,
        '@media(max-width:899px)': {
          fontSize: '28px',
        },
        '@media(max-width:599px)': {
          fontSize: '24px',
        },
      },
      h3: {
        fontSize: '24px',
        lineHeight: '1.1em',
        fontWeight: '600',
        fontFamily: `${manrope.style.fontFamily}`,

        '@media(max-width:599px)': {
          fontSize: '20px',
        },
      },
      h4: {
        fontSize: '20px',
        lineHeight: '1.3',
        fontWeight: '700',
        fontFamily: `${manrope.style.fontFamily}`,
        '@media(max-width:599px)': {
          fontSize: '18px',
        },
      },
      h5: {
        fontSize: '18px',
        lineHeight: '1.4',
        fontWeight: '500',
        fontFamily: `${manrope.style.fontFamily}`,
      },
      h6: {
        fontSize: '16px',
        lineHeight: '1.5',
        fontWeight: '600',
        fontFamily: `${manrope.style.fontFamily}`,
      },
      body1: {
        fontSize: '16px',
        lineHeight: '1.5em',
        '@media(max-width:599px)': {
          fontSize: '14px',
        },
      },
      body2: {
        fontSize: '14px',
        lineHeight: '1.5em',
      },
      caption: {
        fontSize: '14px',
        lineHeight: '1.5em',
      },
    },
    shadows: [
      'none',
      '0px 2px 4px 0px rgba(47, 43, 61, 0.12)',
      '0px 2px 6px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 8px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 9px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 10px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 11px 0px rgba(47, 43, 61, 0.16)',
      '0px 4px 18px 0px rgba(47, 43, 61, 0.1)',
      '0px 4px 13px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 14px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 15px 0px rgba(47, 43, 61, 0.2)',
      '0px 5px 16px 0px rgba(47, 43, 61, 0.2)',
      '0px 6px 17px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 18px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 19px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 20px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 21px 0px rgba(47, 43, 61, 0.26)',
      '0px 7px 22px 0px rgba(47, 43, 61, 0.26)',
      '0px 8px 23px 0px rgba(47, 43, 61, 0.28)',
      '0px 8px 24px 6px rgba(47, 43, 61, 0.28)',
      '0px 9px 25px 0px rgba(47, 43, 61, 0.3)',
      '0px 9px 26px 0px rgba(47, 43, 61, 0.32)',
      '0px 9px 27px 0px rgba(47, 43, 61, 0.32)',
      '0px 10px 28px 0px rgba(47, 43, 61, 0.34)',
      '0px 10px 30px 0px rgba(47, 43, 61, 0.34)',
    ],

    components: {
      MuiSkeleton: {
        defaultProps: {
          animation: 'wave',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ _ownerState, theme }) => {
            return {
              borderRadius: '8px',
              boxShadow: `0px 4px 24px 0px ${theme.palette.background.paper}`,
            };
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: () => {
            return {
              '@media(max-width:899px)': {
                minHeight: '20px',
              },
            };
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          PaperProps: {
            elevation: 0,
          },
        },
        styleOverrides: {
          paper: ({ _theme }) => {
            return {
              overflow: 'visible !important',
              filter: 'none',
              marginTop: '0',
              boxShadow: '0px 5px 12px 0px #A393B81A',
              borderRadius: '10px',
            };
          },
          list: () => {
            return {
              paddingTop: '0',
              paddingBottom: '0',
            };
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => {
            if (ownerState.variant === 'contained' && ownerState.color === 'primary') {
              return {
                background: defaultPalette(mode).primary.main,
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '16px',
                color: defaultPalette(mode).common.white,
                border: `1px solid ${defaultPalette(mode).primary.main}`,
                padding: '10px 32px',
                textTransform: 'inherit',

                '&:hover': {
                  background: defaultPalette(mode).common.white,
                  color: defaultPalette(mode).primary.main,
                },
              };
            }
            if (ownerState.variant === 'outlined' && ownerState.color === 'primary') {
              return {
                background: 'transparent',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '16px',
                color: defaultPalette(mode).primary.main,
                border: `1px solid ${defaultPalette(mode).primary.main}`,
                padding: '10px 32px',
                textTransform: 'inherit',

                '&:hover': {
                  background: defaultPalette(mode).primary.main,
                  color: defaultPalette(mode).common.white,
                },
              };
            }
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backdropFilter: "blur(4px)"
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: ({ theme }) => ({
            backgroundColor: theme?.palette?.primary.main,
          }),
        },
      },
    },
  };
};
