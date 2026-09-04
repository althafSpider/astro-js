import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion, scoped } from './app';

/**
 * Reveal engine. Handles these markup contracts (all safe without JS):
 *   [data-fx="fade"]            -> opacity in
 *   [data-fx="rise"]            -> opacity + translateY in
 *   [data-fx="clip"]            -> clip-path wipe + inner .fx-img scale
 *   [data-fx-lines]             -> masked line reveal (.l-line > .l-i)
 *   [data-par] (on .avm frame)  -> parallax drift of the inner image
 *   [data-delay="0.2"]          -> optional stagger on any of the above
 */
export function initFx(scope: Element | Document): void {
	if (reducedMotion()) return;
	scoped(scope as Element, () => {
		const root = scope instanceof Document ? document.body : scope;

		/* ---- masked line reveals ---- */
		root.querySelectorAll<HTMLElement>('[data-fx-lines]').forEach((el) => {
			const inner = Array.from(el.querySelectorAll<HTMLElement>('.l-i'));
			gsap
				.timeline({
					scrollTrigger: {
						trigger: el,
						start: 'top 86%',
						toggleActions: 'play none none none',
					},
					defaults: { ease: 'expo.out' },
				})
				.to(el, { opacity: 1, duration: 0.4, ease: 'none' }, 0.05)
				.set(inner, { y: 0, yPercent: 120 }, 0)
				.to(
					inner,
					{
						yPercent: 0,
						duration: 1.3,
						stagger: 0.085,
						ease: 'expo.out',
					},
					0.05,
				);
		});

		/* ---- simple fades / rises ---- */
		root.querySelectorAll<HTMLElement>('[data-fx]').forEach((el) => {
			const kind = el.dataset.fx;
			const delay = parseFloat(el.dataset.delay ?? '0');
			if (kind === 'fade' || kind === 'rise') {
				gsap.fromTo(
					el,
					{ autoAlpha: 0, y: kind === 'rise' ? 28 : 0 },
					{
						autoAlpha: 1,
						y: 0,
						duration: 1.4,
						delay,
						ease: 'expo.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 88%',
							toggleActions: 'play none none none',
						},
					},
				);
			} else if (kind === 'clip') {
				const imgs = el.querySelectorAll<HTMLElement>('.fx-img');
				gsap
					.timeline({
						scrollTrigger: {
							trigger: el,
							start: 'top 86%',
							toggleActions: 'play none none none',
						},
						defaults: { ease: 'expo.out' },
						onComplete: () => {
							// release inline transforms so CSS hover zoom can take over
							imgs.forEach((img) => gsap.set(img, { clearProps: 'transform' }));
						},
					})
					.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, delay })
					.fromTo(imgs, { scale: 1.12 }, { scale: 1, duration: 1.9, ease: 'power3.out' }, 0.05);
			}
		});

		/* ---- parallax drift (subtle, scrub-driven) ---- */
		root.querySelectorAll<HTMLElement>('[data-par]').forEach((frame) => {
			const img = frame.querySelector('img');
			if (!img) return;
			const speed = parseFloat(frame.dataset.par ?? '8');
			gsap.fromTo(
				img,
				{ yPercent: -speed },
				{
					yPercent: speed,
					ease: 'none',
					scrollTrigger: {
						trigger: frame,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				},
			);
		});
	});

	ScrollTrigger.refresh();
}
