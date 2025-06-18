'use client';
import { useEffect, useState } from 'react';

export default function VideoItem({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    videoEmbed,
    showControls = false,
  } = value || {};

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 500);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  if (!videoEmbed) return null;

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  const match = videoEmbed.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (!match) return null;

  const videoId = match[1];
  const hash = match[2];

  const params = new URLSearchParams({
    autoplay: isMobile || showControls ? '0' : '1',
    muted: '1',
    loop: '1',
    controls: isMobile || showControls ? '1' : '0',
    dnt: '1',
    playsinline: '1',
  });

  if (hash) params.set('h', hash);

  const embedUrl = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;

  return (
    <div className={`video-item-wrapper ${spaceBetwen}`}>
      <div className="video-item" style={heightStyle}>
        <iframe
          src={embedUrl}
          style={{ width: '100%', height: '100%', border: '0' }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Embedded Vimeo Video"
        />
      </div>
    </div>
  );
}

