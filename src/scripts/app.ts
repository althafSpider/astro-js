import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initFx } from './fx';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const reducedMotion = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const EASE = {
	out: 'expo.out',
	out3: 'power3.out',
	io: 'power2.inOut',
};

/* ------------------------------------------------------------------ */
/* Boot registry — modules register page-load callbacks; every boot    */
/* first reverts the previous page's GSAP work, then re-runs them      */
/* against the freshly swapped DOM.                                    */
/* ------------------------------------------------------------------ */

const contexts: gsap.Context[] = [];
const cleanups: Array<() => void> = [];
const queue: Array<() => void> = [];
let lenis: Lenis | null = null;
let lastBoot = 0;
let progressCleanup: (() => void) | null = null;

/** Register a teardown callback that runs at the top of the next boot. */
export function cleanup(fn: () => void): void {
	cleanups.push(fn);
}

/** Run `fn` inside a GSAP context scoped to `root`; reverted on next boot. */
export function scoped(root: Element | null | undefined, fn: () => void): void {
	if (!root) return;
	const ctx = gsap.context(fn, root);
	contexts.push(ctx);
}

/** Register a callback that re-runs after every page load / navigation. */
export function onBoot(fn: () => void): void {
	queue.push(fn);
}

/* ------------------------------------------------------------------ */
/* Scroll progress indicator                                           */
/* ------------------------------------------------------------------ */

function bindProgress(): void {
	progressCleanup?.();
	const fill = document.querySelector('[data-scroll-fill]');
	if (!fill) return;
	const update = () => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
		(fill as HTMLElement).style.transform = `scaleY(${p})`;
	};
	const tick = () => update();
	lenis?.on('scroll', tick);
	window.addEventListener('scroll', tick, { passive: true });
	update();
	progressCleanup = () => {
		window.removeEventListener('scroll', tick);
		lenis?.off('scroll', tick);
	};
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

function boot(): void {
	const now = Date.now();
	if (now - lastBoot < 150) return;
	lastBoot = now;

	/* ---- teardown previous page state ---- */
	contexts.forEach((c) => c.revert());
	contexts.length = 0;
	cleanups.forEach((fn) => fn());
	cleanups.length = 0;
	progressCleanup?.();
	progressCleanup = null;
	lenis?.destroy();
	lenis = null;
	document.documentElement.classList.remove('menu-open');
	document.body.style.overflow = '';

	/* ---- smooth scroll (native behaviour when motion is reduced) ---- */
	if (!reducedMotion()) {
		lenis = new Lenis({
			duration: 1.25,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			touchMultiplier: 1.4,
			autoRaf: true,
		});
		lenis.on('scroll', ScrollTrigger.update);
	}

	/* ---- page-load work ---- */
	queue.forEach((fn) => fn());
	initFx(document.body);
	bindProgress();

	/* sizes settle after webfonts / images */
	requestAnimationFrame(() => ScrollTrigger.refresh());
	const onLoad = () => ScrollTrigger.refresh();
	window.addEventListener('load', onLoad, { once: true });
}

/* ---- lifecycle wiring ----
 * Boot must run once the DOM is ready *and* every component module has had a
 * chance to register its page-load work. Deferred module scripts execute
 * between readyState "interactive" and DOMContentLoaded, so an immediate boot
 * at "interactive" would run with an empty queue; wait for DOMContentLoaded
 * instead. The 150 ms guard then dedupes the astro:page-load event that Astro
 * also fires on the initial load. */
function start(): void {
	if (document.readyState === 'loading' || document.readyState === 'interactive') {
		document.addEventListener('DOMContentLoaded', boot, { once: true });
	} else {
		boot();
	}
	document.addEventListener('astro:page-load', boot);
}

start();

/** programmatic smooth scroll (falls back to native for reduced motion) */
export function scrollTo(target: string | number, offset = 0): void {
	if (lenis) {
		lenis.scrollTo(target as never, { offset, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
	} else if (typeof target === 'number') {
		window.scrollTo({ top: target, behavior: 'smooth' });
	} else {
		const el = document.querySelector(target);
		el?.scrollIntoView({ behavior: 'smooth' });
	}
}

/** lock page scroll while the menu / overlays are open */
export function lockScroll(locked: boolean): void {
	if (lenis) {
		if (locked) lenis.stop();
		else lenis.start();
	} else {
		document.documentElement.classList.toggle('is-locked', locked);
	}
}
