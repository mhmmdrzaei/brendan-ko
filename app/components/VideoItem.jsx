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
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width so we can switch logic below 800px
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build Vimeo embed URL
  useEffect(() => {
    if (!videoEmbed) return;

    const mobile = window.innerWidth <= 500;
    const match = videoEmbed.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
    if (!match) return;

    const videoId = match[1];
    const hash = match[2];

    const params = new URLSearchParams({
      autoplay: showControls? '0': '1',
      muted: '1',
      loop: '1',
      controls: mobile || showControls ? '1' : '0',
      dnt: '1',
      playsinline: '1',
      api: '1',
    });
    if (hash) params.set('h', hash);

    const url = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    setEmbedUrl(url);
    setMounted(true);
  }, [videoEmbed, showControls]);

  // Play programmatically (Safari autoplay workaround)
  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);

    player.ready().then(() => {
      player.setMuted(true);
      player.play().catch(() => {
        // Safari may still block it silently; safe to ignore
      });
    });
  }, [embedUrl]);

  if (!videoEmbed) return null;

  // Height logic: cap at 76dvh and disable on small screens
  let heightStyle;
  if (isMobile) {
    heightStyle = { width: '100%', height: 'auto', aspectRatio: '16 / 9', minHeight: '200px' };
  } else {
    const cappedHeight = boxHeight && boxHeight < 100
      ? `${(boxHeight / 100) * 76}dvh`
      : '76dvh';
    heightStyle = { height: cappedHeight, minHeight: '200px' };
  }

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
