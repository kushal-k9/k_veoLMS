import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn } from "./engagement.endpoints-DZsa6Hgq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/YouTubePlayer-CQkVZovR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
/**
* Normalize whatever is stored in `youtubeId` down to a bare 11-char video id.
* The admin form *tries* to parse ids on input, but values still arrive as full
* watch/share/shorts/live/embed URLs, or with stray params or whitespace. Build
* the embed URL from raw input and YouTube renders its generic
* "An error occurred. Please try again later." failure screen.
*/
function extractYouTubeId(input) {
	const raw = (input ?? "").trim();
	if (!raw) return "";
	const bare = raw.match(/^[\w-]{11}(?=$|[?&/])/);
	if (bare) return bare[0];
	const m = raw.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^&]*&)*v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/);
	if (m) return m[1];
	const v = raw.match(/[?&]v=([\w-]{11})/);
	return v ? v[1] : "";
}
function YouTubePlayer({ youtubeId, title, playbackRate }) {
	const id = extractYouTubeId(youtubeId);
	const iframeRef = (0, import_react.useRef)(null);
	const apiEnabled = playbackRate !== void 0;
	(0, import_react.useEffect)(() => {
		if (!apiEnabled || !iframeRef.current) return;
		const post = () => iframeRef.current?.contentWindow?.postMessage(JSON.stringify({
			event: "command",
			func: "setPlaybackRate",
			args: [playbackRate]
		}), "*");
		post();
		const t = setTimeout(post, 600);
		return () => clearTimeout(t);
	}, [
		playbackRate,
		apiEnabled,
		id
	]);
	if (!id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex aspect-video w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-black text-center shadow-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-white/90",
			children: "Video unavailable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-white/50",
			children: "No valid YouTube video is set for this lesson."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			ref: iframeRef,
			className: "absolute inset-0 h-full w-full",
			src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` + (apiEnabled ? "&enablejsapi=1" : ""),
			title,
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			allowFullScreen: true
		}, id)
	});
}
//#endregion
export { YouTubePlayer as n, extractYouTubeId as r, Textarea as t };
