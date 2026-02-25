import { useMemo } from 'react'
import {
    Description,
    Email,
    GitHub,
    LinkedIn,
    School,
} from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import {
    ORBIT_GEOMETRY,
    PROFILE_LINKS,
    type ProfileLinkId,
} from '../config/profileLinks'

const ORBIT_PERIOD_SECONDS = 18 // The period of the orbit, in seconds.
const ORBIT_SIZE = { xs: 320, sm: 420 } // The overall size of the orbit container.
const ORBIT_HEIGHT = { xs: 300, sm: 340 } // The height of the orbit container.
const ORBIT_Z_OFFSET = 20 // The z-axis offset for the orbiting links.

const LINK_ICONS: Record<ProfileLinkId, typeof Email> = {
    email: Email,
    github: GitHub,
    scholar: School,
    cv: Description,
    linkedin: LinkedIn,
}

/** Camera container with perspective */
const orbitRootSx = {
    position: 'relative',
    width: '100%',
    maxWidth: 620,
    height: ORBIT_HEIGHT,
    mx: 'auto',
    perspective: '1000px',
    display: 'grid',
    placeItems: 'center',
    isolation: 'isolated',
}

/** The orbital plane, tilted for 3D effect */
const orbitSceneSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformStyle: 'preserve-3d',
    transform: `translate(-50%, -50%) rotateX(${ORBIT_GEOMETRY.tilt}deg)`,
    width: ORBIT_SIZE,
    height: ORBIT_SIZE,
    zIndex: 1,
}

/** The visible track of the orbit */
const orbitTrackSx = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'divider',
    background:
        'radial-gradient(circle, rgba(255,255,255,0.2), rgba(255,255,255,0.02) 70%, transparent)',
    boxShadow: (theme: Theme) => `0 10px 30px ${theme.palette.action.selected}`,
    pointerEvents: 'none',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-3%',
        borderRadius: '50%',
        border: '1px dashed',
        borderColor: 'divider',
        opacity: 0.45,
        pointerEvents: 'none',
    },
}

/** The spinning container for the links */
const orbitSpinSx = {
    position: 'absolute',
    inset: 0,
    transformStyle: 'preserve-3d',
    zIndex: 3,
    animation: `orbit-spin ${ORBIT_PERIOD_SECONDS}s linear infinite`,
    willChange: 'transform',
    '@keyframes orbit-spin': {
        from: {
            transform: 'rotateZ(0deg)',
        },
        to: {
            transform: 'rotateZ(360deg)',
        },
    },
}

/** Base styles for the link buttons */
const linkButtonSx = {
    minWidth: 126,
    px: 2.5,
    py: 1,
    borderRadius: 999,
    borderWidth: 2,
    fontWeight: 600,
    textTransform: 'none',
    backdropFilter: 'blur(6px)',
    backgroundColor: 'background.paper',
    '& .MuiSvgIcon-root': {
        fontSize: 21,
    },
    '&:hover, &:focus-visible': {
        borderColor: 'primary.main',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        boxShadow: (theme: Theme) =>
            `0 0 0 4px ${theme.palette.primary.main}40`,
    },
    '&.Mui-disabled': {
        opacity: 0.65,
        cursor: 'not-allowed',
    },
}

export default function LinkOrbit() {
    const supports3D = useMemo(
        () =>
            typeof window !== 'undefined' &&
            typeof window.CSS !== 'undefined' &&
            window.CSS.supports('transform-style', 'preserve-3d') &&
            window.CSS.supports('perspective', '1px'),
        []
    )

    if (!supports3D) {
        return (
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                justifyContent='center'
                alignItems='center'
                sx={{ mt: 1.5 }}
            >
                {PROFILE_LINKS.map((link) => {
                    const Icon = LINK_ICONS[link.id]
                    const isDisabled = Boolean(link.disabled)

                    return (
                        <Button
                            key={link.id}
                            component='a'
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={
                                link.external
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            disabled={isDisabled}
                            variant='outlined'
                            size='large'
                            startIcon={<Icon />}
                            sx={linkButtonSx}
                        >
                            {link.label}
                        </Button>
                    )
                })}
            </Stack>
        )
    }

    return (
        <Box sx={orbitRootSx}>
            <Box sx={orbitSceneSx}>
                <Box sx={orbitTrackSx} />

                <Box sx={orbitSpinSx}>
                    {PROFILE_LINKS.map((link) => {
                        const Icon = LINK_ICONS[link.id]
                        const isDisabled = Boolean(link.disabled)
                        const counterSpinAnimation = `orbit-counter-spin-${link.id}` // keeps each link user-faced by applying a counter-spin

                        return (
                            <Box
                                key={link.id}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transformStyle: 'preserve-3d',
                                    pointerEvents: 'none',
                                    transform: `translate(-50%, -50%) rotateZ(${link.angle}deg) translateX(${ORBIT_GEOMETRY.radius}px) translateZ(${ORBIT_Z_OFFSET}px)`,
                                }}
                            >
                                <Button
                                    component='a'
                                    href={link.href}
                                    target={
                                        link.external ? '_blank' : undefined
                                    }
                                    rel={
                                        link.external
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    disabled={isDisabled}
                                    variant='outlined'
                                    size='large'
                                    startIcon={<Icon />}
                                    sx={{
                                        ...linkButtonSx,
                                        pointerEvents: 'auto',
                                        transformStyle: 'preserve-3d',
                                        animation: `${counterSpinAnimation} ${ORBIT_PERIOD_SECONDS}s linear infinite`,
                                        [`@keyframes ${counterSpinAnimation}`]:
                                            {
                                                from: {
                                                    transform: `rotateZ(-${link.angle}deg) rotateX(-${ORBIT_GEOMETRY.tilt}deg)`,
                                                },
                                                to: {
                                                    transform: `rotateZ(-${link.angle + 360}deg) rotateX(-${ORBIT_GEOMETRY.tilt}deg)`,
                                                },
                                            },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}
