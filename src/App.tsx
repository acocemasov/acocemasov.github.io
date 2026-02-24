import { useState } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { getTheme } from './theme'
import HomePage from './components/HomePage'
import Footer from './components/Footer'

export default function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('dark')
    const theme = getTheme(mode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box display='flex' flexDirection='column' minHeight='100vh'>
                <HomePage />
                <Footer mode={mode} onChangeMode={setMode} />
            </Box>
        </ThemeProvider>
    )
}
