//#region node_modules/.nitro/vite/services/ssr/assets/motion-D-zm4uIr.js
/** Tuned spring for snappy-but-soft UI motion (cards, toggles, drawers). */
var springSoft = {
	type: "spring",
	stiffness: 260,
	damping: 30,
	mass: .9
};
var easeOutExpo = {
	duration: .5,
	ease: [
		.16,
		1,
		.3,
		1
	]
};
/**
* Fade + rise. When reduced motion is requested we keep the fade but drop the
* translate so nothing visibly moves.
*/
function fadeInUp(reduced = false) {
	return {
		hidden: {
			opacity: 0,
			y: reduced ? 0 : 24
		},
		show: {
			opacity: 1,
			y: 0,
			transition: easeOutExpo
		}
	};
}
function scaleIn(reduced = false) {
	return {
		hidden: {
			opacity: 0,
			scale: reduced ? 1 : .96
		},
		show: {
			opacity: 1,
			scale: 1,
			transition: springSoft
		}
	};
}
/**
* Container variant that staggers its children. `staggerChildren` is skipped
* (set to 0) under reduced motion so everything appears at once.
*/
function staggerContainer(reduced = false, stagger = .08) {
	return {
		hidden: {},
		show: { transition: {
			staggerChildren: reduced ? 0 : stagger,
			delayChildren: reduced ? 0 : .04
		} }
	};
}
/** Cross-fade + slight rise used for full-page route transitions. */
function pageTransition(reduced = false) {
	return {
		hidden: {
			opacity: 0,
			y: reduced ? 0 : 8
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .3,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		},
		exit: {
			opacity: 0,
			y: reduced ? 0 : -8,
			transition: {
				duration: .2,
				ease: "easeIn"
			}
		}
	};
}
//#endregion
export { staggerContainer as a, springSoft as i, pageTransition as n, scaleIn as r, fadeInUp as t };
