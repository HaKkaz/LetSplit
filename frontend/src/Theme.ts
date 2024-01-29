import { extendTheme } from '@mui/joy/styles';

// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
    interface ColorPalettePropOverrides {
        // apply to all Joy UI components that support `color` prop
        secondary: true;
    }

    interface Palette {
        // this will make the node `secondary` configurable in `extendTheme`
        // and add `secondary` to the theme's palette.
        secondary: PaletteRange;
    }
}

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                secondary: {
                    // Credit:
                    // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
                    50: '#7CBBAE',
                    100: '#7CBBAE',
                    200: '#7CBBAE',
                    300: '#7CBBAE',
                    400: '#7CBBAE',
                    500: '#7CBBAE',
                    600: '#7CBBAE',
                    700: '#7CBBAE',
                    800: '#7CBBAE',
                    900: '#7CBBAE',
                    // Adjust the global variant tokens as you'd like.
                    // The tokens should be the same for all color schemes.
                    solidBg: 'var(--joy-palette-secondary-400)',
                    solidActiveBg: 'var(--joy-palette-secondary-500)',
                    outlinedBorder: 'var(--joy-palette-secondary-500)',
                    outlinedColor: 'var(--joy-palette-secondary-700)',
                    outlinedActiveBg: 'var(--joy-palette-secondary-100)',
                    softColor: 'var(--joy-palette-secondary-800)',
                    softBg: 'var(--joy-palette-secondary-200)',
                    softActiveBg: 'var(--joy-palette-secondary-300)',
                    plainColor: 'var(--joy-palette-secondary-700)',
                    plainActiveBg: 'var(--joy-palette-secondary-100)',
                },
            },
        },
        dark: {
            palette: {
                secondary: {
                    // Credit:
                    // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
                    50: '#7CBBAE',
                    100: '#7CBBAE',
                    200: '#7CBBAE',
                    300: '#7CBBAE',
                    400: '#7CBBAE',
                    500: '#7CBBAE',
                    600: '#7CBBAE',
                    700: '#7CBBAE',
                    800: '#7CBBAE',
                    900: '#7CBBAE',
                    // Adjust the global variant tokens as you'd like.
                    // The tokens should be the same for all color schemes.
                    solidBg: 'var(--joy-palette-secondary-400)',
                    solidActiveBg: 'var(--joy-palette-secondary-500)',
                    outlinedBorder: 'var(--joy-palette-secondary-700)',
                    outlinedColor: 'var(--joy-palette-secondary-600)',
                    outlinedActiveBg: 'var(--joy-palette-secondary-900)',
                    softColor: 'var(--joy-palette-secondary-500)',
                    softBg: 'var(--joy-palette-secondary-900)',
                    softActiveBg: 'var(--joy-palette-secondary-800)',
                    plainColor: 'var(--joy-palette-secondary-500)',
                    plainActiveBg: 'var(--joy-palette-secondary-900)',
                },
            },
        },
    },
});
export default theme;

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50% ',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};