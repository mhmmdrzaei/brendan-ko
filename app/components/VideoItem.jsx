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
  const wrapperRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [videoRatio, setVideoRatio] = useState(16 / 9);
  const [videoSize, setVideoSize] = useState(null);

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
      Promise.all([player.getVideoWidth(), player.getVideoHeight()])
        .then(([width, height]) => {
          if (width > 0 && height > 0) {
            setVideoRatio(width / height);
          }
        })
        .catch(() => {});

      player.setMuted(true);
      player.play().catch(() => {
        // Safari may still block it silently; safe to ignore
      });
    });

    return () => {
      player.destroy().catch(() => {});
    };
  }, [embedUrl]);

  useEffect(() => {
    const updateVideoSize = () => {
      const parentWidth = wrapperRef.current?.parentElement?.clientWidth;
      const viewportWidth = Math.max(
        window.innerWidth - 30,
        document.documentElement.clientWidth - 30,
      );
      const maxWidth = Math.min(Math.max(parentWidth || viewportWidth, 200), 1440);
      const baseHeight = Math.max(window.innerHeight - 170, 200);
      const heightFactor = boxHeight && boxHeight < 100 ? boxHeight / 100 : 1;
      const heightCap = window.innerWidth <= 800 ? 500 : Infinity;
      const maxHeight = Math.min(baseHeight * heightFactor, heightCap);

      let height = maxHeight;
      let width = height * videoRatio;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / videoRatio;
      }

      setVideoSize({
        width: Math.max(1, Math.round(width)),
        height: Math.max(1, Math.round(height)),
      });
    };

    updateVideoSize();
    const rafId = window.requestAnimationFrame(updateVideoSize);
    const timeoutId = window.setTimeout(updateVideoSize, 120);
    window.addEventListener('resize', updateVideoSize);
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateVideoSize) : null;
    if (resizeObserver && wrapperRef.current?.parentElement) {
      resizeObserver.observe(wrapperRef.current.parentElement);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', updateVideoSize);
      resizeObserver?.disconnect();
    };
  }, [videoRatio, boxHeight]);

  const videoStyle = videoSize
    ? { width: `${videoSize.width}px`, height: `${videoSize.height}px` }
    : undefined;

  if (!videoEmbed) return null;

  return (
    <div ref={wrapperRef} className={`video-item-wrapper ${spaceBetwen}`}>
      <div className="video-item" style={videoStyle}>
        {mounted && embedUrl ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
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
