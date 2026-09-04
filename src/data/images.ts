/**
 * All imagery is served from Unsplash's CDN at a fixed crop size so the
 * browser never downloads more pixels than the slot needs. Sizes are set by
 * the caller through the `sizes` prop on the <img>; `u()` only builds the URL.
 */

export type Crop = 'faces' | 'entropy' | 'edges';

/** Build an images.unsplash.com URL at an exact pixel size / crop. */
export const u = (photo: string, w: number, h?: number, crop?: Crop): string => {
	const q = new URLSearchParams();
	q.set('q', '80');
	q.set('w', String(w));
	if (h) q.set('h', String(h));
	q.set('auto', 'format');
	q.set('fit', 'crop');
	if (crop) q.set('crop', crop);
	return `https://images.unsplash.com/${photo}?${q.toString()}`;
};

/** A photo reference stored in the data layer (id is the full photo path). */
export interface Photo {
	/** full slug, e.g. "photo-1509631179647-0177331693ae" */
	slug: string;
	alt: string;
}

/** Convenience accessor — resolves a Photo at the requested dimensions. */
export const src = (p: Photo, w: number, h?: number, crop?: Crop): string => u(p.slug, w, h, crop);
