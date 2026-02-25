export type ProfileLinkId = 'email' | 'github' | 'scholar' | 'cv' | 'linkedin'

/**
 * Orbital geometry configuration.
 * - count: number of items in the orbit
 * - radius: the radius of the orbit
 * - zVariation: how much the links move in the z-axis to enhance 3D effect
 * - tilt: the angle at which the orbital plane is tilted for better visibility
 */
export interface OrbitGeometry {
    readonly count: number
    readonly radius: number
    readonly zVariation: number
    readonly tilt: number
}

export const ORBIT_GEOMETRY: OrbitGeometry = {
    count: 5,
    radius: 190,
    zVariation: 70,
    tilt: 74,
}

export interface ProfileLink {
    id: ProfileLinkId
    label: string
    href: string
    angle: number
    z: number
    external?: boolean
    disabled?: boolean
}

/**
 * Compute orbital angle and depth (z) for an item at a given index.
 * This ensures consistent spacing around the orbit.
 */
const computeOrbitParams = (index: number, total: number): { angle: number; z: number } => {
    const angle = (360 / total) * index
    const z = Math.sin((angle * Math.PI) / 180) * ORBIT_GEOMETRY.zVariation
    return { angle, z }
}

const BASE_LINKS: Omit<ProfileLink, 'angle' | 'z'>[] = [
    {
        id: 'email',
        label: 'Email',
        href: 'mailto:a.cocemasov@gmail.com',
    },
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/akocemasov',
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
