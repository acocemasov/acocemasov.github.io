import { Box, Container, IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'

interface FooterProps {
    mode: 'light' | 'dark'
    onChangeMode: (mode: 'light' | 'dark') => void
}

export default function Footer({ mode, onChangeMode }: FooterProps) {
    return (
        <Box
            component='footer'
            sx={{
                py: 2,
                px: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth='md'>
                <Box display='flex' justifyContent='center'>
                    <IconButton
                        color='inherit'
                        aria-label='Toggle theme'
                        onClick={() =>
                            onChangeMode(mode === 'light' ? 'dark' : 'light')
                        }
                    >
                        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Box>
            </Container>
        </Box>
    )
}
