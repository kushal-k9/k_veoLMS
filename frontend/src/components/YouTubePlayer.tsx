import { useEffect, useRef } from "react";

/**
 * Normalize whatever is stored in `youtubeId` down to a bare 11-char video id.
 * The admin form *tries* to parse ids on input, but values still arrive as full
 * watch/share/shorts/live/embed URLs, or with stray params or whitespace. Build
 * the embed URL from raw input and YouTube renders its generic
 * "An error occurred. Please try again later." failure screen.
 */
export function extractYouTubeId(input: string): string {
  const raw = (input ?? "").trim();
  if (!raw) return "";

  // Already a bare id (allow trailing junk like "?si=..." just in case).
  const bare = raw.match(/^[\w-]{11}(?=$|[?&/])/);
  if (bare) return bare[0];

  // Any of the common URL shapes: watch?v=, youtu.be/, /embed/, /shorts/, /live/, /v/.
  const m = raw.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^&]*&)*v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/
  );
  if (m) return m[1];

  // Last resort: a `v=` param anywhere in the string.
  const v = raw.match(/[?&]v=([\w-]{11})/);
  return v ? v[1] : "";
}

export function YouTubePlayer({
  youtubeId,
  title,
  playbackRate,
}: {
  youtubeId: string;
  title: string;
  /**
   * When provided, the embed enables the JS API and the player's playback rate
   * is driven via postMessage. Omit it (trailer/preview) for a plain embed.
   */
  playbackRate?: number;
}) {
  const id = extractYouTubeId(youtubeId);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiEnabled = playbackRate !== undefined;

  // Push the requested rate to the player whenever it changes.
  useEffect(() => {
    if (!apiEnabled || !iframeRef.current) return;
    const post = () =>
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setPlaybackRate",
          args: [playbackRate],
        }),
        "*",
      );
    // Try immediately and again shortly after, in case the player is still loading.
    post();
    const t = setTimeout(post, 600);
    return () => clearTimeout(t);
  }, [playbackRate, apiEnabled, id]);

  if (!id) {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-black text-center shadow-elevated">
        <p className="text-sm font-medium text-white/90">Video unavailable</p>
        <p className="text-xs text-white/50">No valid YouTube video is set for this lesson.</p>
      </div>
    );
  }

  const src =
    `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` +
    (apiEnabled ? "&enablejsapi=1" : "");

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-elevated">
      <iframe
        key={id}
        ref={iframeRef}
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
