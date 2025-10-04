'use client';
import { useEffect, useState } from 'react';

export default function TwoImageSwap({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage1,
    slideImage2,
    enableSwap1,
    swapImage1,
    enableSwap2,
    swapImage2,
  } = value || {};

  const [hovered, setHovered] = useState({ 0: false, 1: false });
  const [swapped, setSwapped] = useState({ 0: false, 1: false });

  useEffect(() => {
    const timers = [];

    if (enableSwap1 && swapImage1?.asset) {
      timers.push(setInterval(() => {
        setSwapped((prev) => ({ ...prev, 0: !prev[0] }));
      }, 5000));
    }

    if (enableSwap2 && swapImage2?.asset) {
      timers.push(setInterval(() => {
        setSwapped((prev) => ({ ...prev, 1: !prev[1] }));
      }, 5000));
    }

    return () => timers.forEach(clearInterval);
  }, [enableSwap1, swapImage1, enableSwap2, swapImage2]);

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  const imageData = [
    {
      base: slideImage1,
      enabled: enableSwap1,
      swap: swapImage1,
    },
    {
      base: slideImage2,
      enabled: enableSwap2,
      swap: swapImage2,
    },
  ];

  return (
    <div className={`two-image-wrapper ${spaceBetwen}`}>
      {imageData.map(({ base, enabled, swap }, idx) => {
        if (!base?.asset) return null;

        const showSwap = enabled && swap?.asset && (hovered[idx] || swapped[idx]);
        const imageUrl = showSwap ? swap.asset.url : base.asset.url;
        const altText = showSwap ? swap.altText || '' : base.altText || '';

        return (
          <div
            key={idx}
            className="two-image-item"
            style={heightStyle}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, [idx]: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, [idx]: false }))}
          >
            <img
              src={imageUrl}
              alt={altText}
              className="image-object"
            />
            {base.caption && <p className="image-caption">{base.caption}</p>}
          </div>
        );
      })}
    </div>
  );
}
