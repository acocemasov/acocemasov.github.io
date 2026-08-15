export type ProfileLinkId = 'email' | 'github' | 'scholar' | 'cv' | 'linkedin'

/**
 * Orbital geometry configuration.
 * - radius: the radius of the orbit
 * - tilt: the angle at which the orbital plane is tilted for better visibility
 */
export interface OrbitGeometry {
    readonly radius: number
    readonly tilt: number
}

export const ORBIT_GEOMETRY: OrbitGeometry = {
    radius: 190,
    tilt: 74,
}

export interface ProfileLink {
    id: ProfileLinkId
    label: string
    href: string
    angle: number
    external?: boolean
    disabled?: boolean
}

/**
 * Compute orbital angle for an item at a given index.
 * This ensures consistent spacing around the orbit.
 */
const computeOrbitParams = (index: number, total: number): { angle: number } => {
    const angle = (360 / total) * index
    return { angle }
}

const BASE_LINKS: Omit<ProfileLink, 'angle'>[] = [
    {
        id: 'email',
        label: 'Email',
        href: 'mailto:a.cocemasov@gmail.com',
    },
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/acocemasov',
        external: true,
    },
    {
        id: 'scholar',
        label: 'Scholar',
        href: 'https://scholar.google.com/citations?user=XvVBizsAAAAJ',
        external: true,
    },
    {
        id: 'cv',
        label: 'CV',
        href: '/cv.pdf', // TODO: add CV file to public folder
        disabled: true,
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/your-linkedin/', // TODO: replace with actual LinkedIn link
        external: true,
        disabled: true,
    },
]

export const PROFILE_LINKS: ProfileLink[] = BASE_LINKS.map((link, index) => ({
    ...link,
    ...computeOrbitParams(index, BASE_LINKS.length),
}))
