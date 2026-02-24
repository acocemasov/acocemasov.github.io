import { createTheme } from '@mui/material/styles'

const LIGHT_PRIMARY = '#0f4c81'
const DARK_PRIMARY = '#7fd6ff'

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? LIGHT_PRIMARY : DARK_PRIMARY,
                contrastText: mode === 'light' ? '#ffffff' : '#04263a',
            },
            background: {
                default: mode === 'light' ? '#f7f9fc' : '#071018',
                paper: mode === 'light' ? '#ffffff' : '#0e1924',
            },
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            h4: {
                fontWeight: 700,
                letterSpacing: '-0.01em',
            },
            h6: {
                fontWeight: 500,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderWidth: 2,
                    },
                },
            },
        },
    })
