import { Box, Container, Typography } from '@mui/material'
import LinkOrbit from './LinkOrbit'

export default function HomePage() {
    return (
        <Container
            maxWidth='md'
            sx={{
                flex: 1,
                minHeight: 0,
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
                <Typography variant='h5' fontWeight={700} gutterBottom>
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
