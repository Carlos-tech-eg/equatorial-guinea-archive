'use client';

import { useMemo } from 'react';

type YouTubeBackgroundVideoProps = {
  videoId: string;
  className?: string;
};

export function YouTubeBackgroundVideo({ videoId, className = '' }: YouTubeBackgroundVideoProps) {
  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId,
      controls: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  return (
    <div className={`youtube-bg ${className}`.trim()} aria-hidden>
      <iframe
        src={embedSrc}
        title=""
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
