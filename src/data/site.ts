export const site = {
	name: 'Adrian Vale',
	nameShort: 'VALE',
	role: 'Photographer / Director',
	location: 'Paris, FR',
	coords: '48.85°N — 2.35°E',
	established: 2014,
	email: 'hello@example.com',
	url: 'https://adrianvale.example',
	availability: 'Available for commissions — 2026',
	instagram: '@adrian.vale',
} as const;

export const nav = [
	{ label: 'Work', href: '/work' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
] as const;

export const socials = [
	{ label: 'Instagram', handle: site.instagram, href: 'https://instagram.com' },
	{ label: 'Behance', handle: 'behance.net/adrianvale', href: 'https://behance.net' },
	{ label: 'Email', handle: site.email, href: `mailto:${site.email}` },
] as const;

export const formatYear = (y: number) => String(y);
