'use client';
import { useEffect, useState, useRef } from 'react';
import Player from '@vimeo/player';

export default function VideoItem({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    videoEmbed,
    showControls = false,
  } = value || {};

  const iframeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);

  useEffect(() => {
    if (!videoEmbed) return;

    const isMobile = window.innerWidth <= 500;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const match = videoEmbed.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
    if (!match) return;

    const videoId = match[1];
    const hash = match[2];

    const params = new URLSearchParams({
      autoplay: '1', // always request autoplay
      muted: '1',
      loop: '1',
      controls: isMobile || showControls ? '1' : '0',
      dnt: '1',
      playsinline: '1',
      api: '1',
    });
    if (hash) params.set('h', hash);

    const url = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    setEmbedUrl(url);
    setMounted(true);
  }, [videoEmbed, showControls]);

  // After iframe loads, try to play programmatically (Safari workaround)
  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);

    player.ready().then(() => {
      player.setMuted(true);
      player.play().catch(() => {
        // Safari may still block it silently; optional fallback here
      });
    });
  }, [embedUrl]);

  if (!videoEmbed) return null;

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%`, minHeight: '200px' }
      : { height: '100%', minHeight: '200px' };

  return (
    <div className={`video-item-wrapper ${spaceBetwen}`}>
      <div className="video-item" style={heightStyle}>
        {mounted && embedUrl ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            style={{ width: '100%', height: '100%', border: '0' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            playsInline
            title="Embedded Vimeo Video"
          />
        ) : null}
      </div>
    </div>
  );
}
