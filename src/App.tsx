import { useState } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { getTheme } from './theme'
import HomePage from './components/HomePage'
import Footer from './components/Footer'

const getInitialMode = (): 'light' | 'dark' => {
    if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        return 'dark'
    }

    return 'light'
}

export default function App() {
    const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode)
    const theme = getTheme(mode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                display='flex'
                flexDirection='column'
                height='100dvh'
                maxHeight='100dvh'
                overflow='hidden'
            >
                <HomePage />
                <Footer mode={mode} onChangeMode={setMode} />
            </Box>
        </ThemeProvider>
    )
}
