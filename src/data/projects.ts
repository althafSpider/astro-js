import type { Photo } from './images';

export type Category = 'fashion' | 'portrait' | 'editorial' | 'documentary' | 'architecture';

export type FeaturedLayout = 'splitL' | 'splitR' | 'center' | 'full';

export type Block =
	| { type: 'text'; kicker?: string; body: string; pull?: boolean }
	| { type: 'full'; photo: Photo; caption?: string }
	| { type: 'band'; photo: Photo; caption?: string }
	| { type: 'wide'; photo: Photo; caption?: string }
	| { type: 'portrait'; photo: Photo; caption?: string }
	| { type: 'duo'; a: Photo; b: Photo };

export interface Project {
	slug: string;
	title: string;
	/** display category, e.g. "Fashion / Editorial" */
	category: string;
	/** filterable tags (lowercase keys) */
	tags: Category[];
	index: string;
	year: string;
	location: string;
	role: string;
	/** short card description */
	description: string;
	cover: Photo;
	/** layout used on the home showcase */
	featured?: FeaturedLayout;
	/** gallery blocks rendered on the detail page */
	body: Block[];
}

const p = (slug: string, alt: string): Photo => ({ slug, alt });

/* eslint-disable prettier/prettier */
export const projects: Project[] = [
	{
		slug: 'nocturne',
		title: 'Nocturne',
		category: 'Fashion / Editorial',
		tags: ['fashion', 'editorial'],
		index: '01',
		year: '2026',
		location: 'Paris',
		role: 'Direction & Photography',
		description:
			'A study of movement, shadow and silence — fashion frames exposed after dark, in a studio with the gallery lights off.',
		cover: p('photo-1529626455594-4ff0802cfb7e', 'Woman in profile lit by a single warm light against a dark studio'),
		featured: 'splitL',
		body: [
			{
				type: 'text',
				kicker: '01 — Approach',
				body: 'Commissioned by a Parisian atelier for its autumn presentation, Nocturne was photographed between midnight and four in the morning. No daylight, no fill — just tungsten lamps and the patience of a sleeping city.',
			},
			{
				type: 'band',
				photo: p('photo-1509631179647-0177331693ae', 'Model standing in a shaft of studio light, darkness all around'),
				caption: 'Nocturne — frame 01',
			},
			{
				type: 'duo',
				a: p('photo-1469334031218-e382a71b716b', 'Model in sunglasses leaning against a wall in low light'),
				b: p('photo-1539109136881-3be0616acf4b', 'Editorial portrait of a woman in a wide-brimmed hat'),
			},
			{
				type: 'text',
				body: 'The camera sees best what the eye almost misses after midnight.',
				pull: true,
			},
			{
				type: 'portrait',
				photo: p('photo-1488426862026-3ee34a7d66df', 'Close portrait, gaze to camera, deep red lips against shadow'),
				caption: 'Nocturne — frame 07',
			},
		],
	},
	{
		slug: 'quiet-hours',
		title: 'The Quiet Hours',
		category: 'Portrait',
		tags: ['portrait'],
		index: '02',
		year: '2026',
		location: 'Paris',
		role: 'Portrait Series',
		description:
			'Portraits photographed between midnight and sunrise — sitters awake while the city sleeps, met by candlelight and a single tungsten lamp.',
		cover: p('photo-1506794778202-cad84cf45f1d', 'Black and white portrait of a man half in shadow, hand raised to his face'),
		featured: 'splitR',
		body: [
			{
				type: 'text',
				kicker: '01 — Premise',
				body: 'Everyone was asked to arrive after dark and to stay until first light. What the frames kept was not exhaustion but a strange clarity — the face a person has when no one is watching.',
			},
			{
				type: 'wide',
				photo: p('photo-1445116572660-236099ec97a0', 'Black and white palm leaves against a pale sky'),
				caption: '05:12 — before the light',
			},
			{
				type: 'duo',
				a: p('photo-1508214751196-bcfd4ca60f91', 'Black and white portrait of a woman, direct and unguarded'),
				b: p('photo-1554151228-14d9def656e4', 'Extreme close portrait of a woman\'s face in soft light'),
			},
			{
				type: 'text',
				body: 'Quiet is not the absence of sound. It is the absence of performance.',
				pull: true,
			},
			{
				type: 'portrait',
				photo: p('photo-1534528741775-53994a69daeb', 'Woman looking over her shoulder, eyes soft, dark backdrop'),
				caption: '03:40 — sitter no. 12',
			},
			{
				type: 'full',
				photo: p('photo-1501594907352-04cda38ebc29', 'First light burning through fog over a wide bridge'),
				caption: '06:59 — the city wakes',
			},
		],
	},
	{
		slug: 'meridian',
		title: 'Meridian',
		category: 'Fashion / Colour',
		tags: ['fashion', 'editorial'],
		index: '03',
		year: '2025',
		location: 'Marseille',
		role: 'Direction & Photography',
		description:
			'A midday colour study for a summer issue — pigment over product, shot between noon and two when the sun stands directly overhead.',
		cover: p('photo-1515886657613-9f3515b0c78f', 'Model in a bright yellow garment against a saturated wall'),
		featured: 'center',
		body: [
			{
				type: 'text',
				kicker: '01 — The brief',
				body: 'Eight looks, one hour of light. Meridian was made on a rooftop in Marseille for a magazine feature on colour — no filters, no grading, only the judgement of high noon.',
			},
			{
				type: 'band',
				photo: p('photo-1508184964240-ee96bb9677a7', 'Model in flowing fabric standing in a sunlit field'),
				caption: 'Meridian — frame 03',
			},
			{
				type: 'duo',
				a: p('photo-1490481651871-ab68de25d43d', 'Fashion portrait against a flat yellow studio background'),
				b: p('photo-1445205170230-053b83016050', 'Model arranging garments in a light-filled studio'),
			},
			{
				type: 'text',
				body: 'Colour is not decoration. It is a decision about what matters.',
				pull: true,
			},
			{
				type: 'portrait',
				photo: p('photo-1503342217505-b0a15ec3261c', 'Beauty portrait with soft midday shadow across the face'),
				caption: 'Meridian — frame 06',
			},
		],
	},
	{
		slug: 'in-transit',
		title: 'In Transit',
		category: 'Documentary',
		tags: ['documentary'],
		index: '04',
		year: '2025',
		location: 'Europe',
		role: 'Reportage',
		description:
			'A month on the road with no itinerary — festival crowds, city mornings, strangers moving between places they call somewhere.',
		cover: p('photo-1533174072545-7a4b6ad7a6c3', 'Crowd at a festival at dusk, arms raised against warm light'),
		featured: 'full',
		body: [
			{
				type: 'text',
				kicker: '01 — The route',
				body: 'Lisbon, Barcelona, Paris, Berlin — four cities, thirty-one days, no commissions and no fixed address. These are the frames kept from the road: people in the interval between departure and arrival.',
			},
			{
				type: 'band',
				photo: p('photo-1470225620780-dba8ba36b745', 'Red stage light cutting through a raised hand at a concert'),
				caption: 'Lisbon — 23:48',
			},
			{
				type: 'duo',
				a: p('photo-1502602898657-3e91760cbb34', 'Cyclist crossing a rain-wet Paris street at dusk'),
				b: p('photo-1514525253161-7a46d19cd819', 'Concert crowd silhouetted against stage lights'),
			},
			{
				type: 'full',
				photo: p('photo-1501386761578-eac5c94b800a', 'Stage lights flaring over a dense festival crowd'),
				caption: 'Barcelona — 01:12',
			},
			{
				type: 'portrait',
				photo: p('photo-1499856871958-5b9627545d1a', 'People crossing the Louvre courtyard in the rain'),
				caption: 'Paris — 09:04',
			},
			{
				type: 'wide',
				photo: p('photo-1492684223066-81342ee5ff30', 'Guests talking at a crowded evening gathering'),
				caption: 'Berlin — 22:17',
			},
		],
	},
	{
		slug: 'ephemera',
		title: 'Ephemera',
		category: 'Portrait / Study',
		tags: ['portrait'],
		index: '05',
		year: '2025',
		location: 'Studio',
		role: 'Portrait Series',
		description:
			'A quiet catalogue of faces — strangers met for twenty minutes, photographed on plain paper, returned to the city.',
		cover: p('photo-1507003211169-0a1dd7228f2d', 'Black and white portrait of a man looking past the camera'),
		body: [
			{
				type: 'text',
				kicker: '01 — Premise',
				body: 'Twenty minutes, one background, no direction. Ephemera is a study of what a stranger will show you when you promise not to keep them long.',
			},
			{
				type: 'full',
				photo: p('photo-1500648767791-00dcc994a43e', 'Studio portrait of a man with a quiet, direct gaze'),
				caption: 'Ephemera — sitter 07',
			},
			{
				type: 'duo',
				a: p('photo-1547425260-76bcadfb4f2c', 'Portrait of a man with a slight smile, short depth of field'),
				b: p('photo-1517841905240-472988babdf9', 'Woman photographed against a plain backdrop, soft light'),
			},
			{
				type: 'portrait',
				photo: p('photo-1494790108377-be9c29b29330', 'Woman laughing, head tilted, natural light'),
				caption: 'Ephemera — sitter 12',
			},
			{
				type: 'text',
				body: 'A face is not a landscape, but it erodes the same way.',
				pull: true,
			},
			{
				type: 'wide',
				photo: p('photo-1544005313-94ddf0286df2', 'Woman with dark hair photographed in soft window light'),
				caption: 'Ephemera — sitter 15',
			},
		],
	},
	{
		slug: 'afterlight',
		title: 'Afterlight',
		category: 'Editorial / Field Notes',
		tags: ['editorial', 'documentary'],
		index: '06',
		year: '2024',
		location: 'Atlantique',
		role: 'Field Study',
		description:
			'Notes from the last hour of daylight — a personal series on coasts and cloud, kept between commissions.',
		cover: p('photo-1509316975850-ff9c5deb0cd9', 'Low dark sea beneath a fading band of light'),
		body: [
			{
				type: 'text',
				kicker: '01 — The study',
				body: 'Begun as an open brief and kept as a private discipline: one frame every evening, from the first warm shadow to the last. Afterlight is the record of those hours.',
			},
			{
				type: 'band',
				photo: p('photo-1470071459604-3b5ec3a7fe05', 'Ridges of fog rolling through a dark valley at dusk'),
				caption: 'Afterlight — dusk, inland',
			},
			{
				type: 'duo',
				a: p('photo-1454496522488-7a8e488e8606', 'Black and white mountain range beneath a heavy sky'),
				b: p('photo-1469474968028-56623f02e42e', 'Sunlight breaking through trees along a hillside'),
			},
			{
				type: 'text',
				body: 'The best light arrives without warning and leaves without apology.',
				pull: true,
			},
			{
				type: 'full',
				photo: p('photo-1501785888041-af3ef285b470', 'Alpine lake reflecting the last orange of the day'),
				caption: 'Afterlight — frame 48',
			},
			{
				type: 'portrait',
				photo: p('photo-1506905925346-21bda4d32df4', 'Ridgeline catching the final low sun'),
				caption: 'Afterlight — frame 52',
			},
		],
	},
	{
		slug: 'concrete-poems',
		title: 'Concrete Poems',
		category: 'Architecture',
		tags: ['architecture'],
		index: '07',
		year: '2024',
		location: 'Europe',
		role: 'Architecture Series',
		description:
			'Six buildings, four cities — an ongoing series on the geometry of modernism, commissioned by an architecture quarterly.',
		cover: p('photo-1503387762-592deb58ef4e', 'White concrete facade cut into a grid of sharp shadows'),
		body: [
			{
				type: 'text',
				kicker: '01 — The series',
				body: 'Modernism promised that light could be organised. This series follows that promise through six buildings and four cities, waiting each time for the hour when shadow completes the plan.',
			},
			{
				type: 'band',
				photo: p('photo-1487958449943-2429e8be8625', 'Curved white museum wall beneath a clear sky'),
				caption: 'Concrete Poems — no. 01',
			},
			{
				type: 'duo',
				a: p('photo-1449157291145-7efd050a4d0e', 'Looking up at a pale building with strong vertical lines'),
				b: p('photo-1511818966892-d7d671e672a2', 'Detail of a white spiral stair against a blue sky'),
			},
			{
				type: 'full',
				photo: p('photo-1486406146926-c627a92ad1ab', 'Glass towers converging at a low angle at dusk'),
				caption: 'Concrete Poems — no. 04',
			},
			{
				type: 'text',
				body: 'Buildings are photographs waiting to be taken. The sun only needs to find the right seat.',
				pull: true,
			},
		],
	},
	{
		slug: 'lumen',
		title: 'Lumen',
		category: 'Architecture / Night',
		tags: ['architecture'],
		index: '08',
		year: '2023',
		location: 'Hong Kong · Chicago',
		role: 'Urban Study',
		description:
			'Vertical cities after dark — a commissioned study of the twenty-four-hour metropolis and the light it keeps on.',
		cover: p('photo-1449824913935-59a10b8d2000', 'Aerial view of a dense night city glittering below'),
		body: [
			{
				type: 'text',
				kicker: '01 — The study',
				body: 'Cities never quite switch off; they only change register. Lumen follows the glow of two vertical cities from the last train to the first — architecture read by its own artificial light.',
			},
			{
				type: 'band',
				photo: p('photo-1477959858617-67f85cf4f1df', 'Chicago river reflecting the lights of the Loop at night'),
				caption: 'Lumen — 00:15',
			},
			{
				type: 'duo',
				a: p('photo-1514565131-fce0801e5785', 'Empty city street under sodium light after rain'),
				b: p('photo-1519501025264-65ba15a82390', 'Neon signs glowing above a night boulevard'),
			},
			{
				type: 'text',
				body: 'A city at night is a photograph still developing.',
				pull: true,
			},
		],
	},
];

/** Ordered project lookup + neighbour navigation for detail pages. */
export const bySlug = (slug: string): Project | undefined =>
	projects.find((project) => project.slug === slug);

export const neighbours = (slug: string): { prev: Project; next: Project } => {
	const i = projects.findIndex((project) => project.slug === slug);
	const len = projects.length;
	return {
		prev: projects[(i - 1 + len) % len],
		next: projects[(i + 1) % len],
	};
};

export const filterKeys: Array<{ key: 'all' | Category; label: string }> = [
	{ key: 'all', label: 'All' },
	{ key: 'fashion', label: 'Fashion' },
	{ key: 'portrait', label: 'Portrait' },
	{ key: 'editorial', label: 'Editorial' },
	{ key: 'documentary', label: 'Documentary' },
	{ key: 'architecture', label: 'Architecture' },
];

/** Home "selected stories" — a sub-set of projects told as essays. */
export interface Story {
	project: Project;
	no: string;
	excerpt: string;
	line: string;
}

export const stories: Story[] = [
	{
		project: bySlug('quiet-hours')!,
		no: '01',
		excerpt: 'Portraits photographed between midnight and sunrise — sitters awake while the city sleeps.',
		line: 'On staying up until the light is honest.',
	},
	{
		project: bySlug('in-transit')!,
		no: '02',
		excerpt: 'Four cities, thirty-one days, no itinerary. Frames from the interval between departure and arrival.',
		line: 'A month of moving without a plan.',
	},
	{
		project: bySlug('afterlight')!,
		no: '03',
		excerpt: 'One frame every evening — a private discipline on coasts and cloud, kept between commissions.',
		line: 'Keeping time with the last hour of daylight.',
	},
];

/** Collections for the horizontal gallery (desktop) / touch rail (mobile). */
export interface Collection {
	no: string;
	title: string;
	note: string;
	filter: Category;
	images: Photo[];
}

export const collections: Collection[] = [
	{
		no: '01',
		title: 'Portraits',
		note: 'People between poses',
		filter: 'portrait',
		images: [
			p('photo-1506794778202-cad84cf45f1d', 'Black and white portrait in deep shadow'),
			p('photo-1508214751196-bcfd4ca60f91', 'Black and white portrait of a woman'),
			p('photo-1534528741775-53994a69daeb', 'Portrait over the shoulder in low light'),
			p('photo-1517841905240-472988babdf9', 'Soft studio portrait'),
			p('photo-1494790108377-be9c29b29330', 'Natural light portrait, laughing'),
			p('photo-1500648767791-00dcc994a43e', 'Direct studio gaze'),
		],
	},
	{
		no: '02',
		title: 'Fashion',
		note: 'Cloth, light, attitude',
		filter: 'fashion',
		images: [
			p('photo-1515886657613-9f3515b0c78f', 'Saturated colour fashion portrait'),
			p('photo-1529626455594-4ff0802cfb7e', 'Low-light beauty frame'),
			p('photo-1469334031218-e382a71b716b', 'Moody fashion portrait in shadow'),
			p('photo-1509631179647-0177331693ae', 'Studio light on dark'),
			p('photo-1490481651871-ab68de25d43d', 'Colour-block studio fashion'),
			p('photo-1445205170230-053b83016050', 'Styling in a light-filled studio'),
		],
	},
	{
		no: '03',
		title: 'Documentary',
		note: 'Crowds & quiet streets',
		filter: 'documentary',
		images: [
			p('photo-1533174072545-7a4b6ad7a6c3', 'Festival crowd at dusk'),
			p('photo-1470225620780-dba8ba36b745', 'Red light and raised hands'),
			p('photo-1502602898657-3e91760cbb34', 'Street crossing in the rain'),
			p('photo-1514525253161-7a46d19cd819', 'Silhouettes against stage light'),
			p('photo-1492684223066-81342ee5ff30', 'Evening gathering'),
			p('photo-1499856871958-5b9627545d1a', 'Rain over a city courtyard'),
		],
	},
	{
		no: '04',
		title: 'Architecture',
		note: 'Light organised',
		filter: 'architecture',
		images: [
			p('photo-1503387762-592deb58ef4e', 'White grid facade in shadow'),
			p('photo-1487958449943-2429e8be8625', 'Curved white wall against sky'),
			p('photo-1449157291145-7efd050a4d0e', 'Vertical lines against the sun'),
			p('photo-1486406146926-c627a92ad1ab', 'Towers at a low angle'),
			p('photo-1511818966892-d7d671e672a2', 'White spiral detail'),
			p('photo-1449824913935-59a10b8d2000', 'Night city from above'),
		],
	},
];
