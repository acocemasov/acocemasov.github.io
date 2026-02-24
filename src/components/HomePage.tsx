import { Box, Container, Typography } from '@mui/material'
import LinkOrbit from './LinkOrbit'

export default function HomePage() {
    return (
        <Container
            maxWidth='md'
            sx={{
                minHeight: 'calc(100vh - 68px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 860,
                }}
            >
                <Typography variant='h4' fontWeight={700} gutterBottom>
                    Alex Cocemasov
                </Typography>
                <Typography variant='h6' color='text.secondary' sx={{ mb: 4 }}>
                    Front-End Developer • Computational Physicist
                </Typography>
                <LinkOrbit />
            </Box>
        </Container>
    )
}
