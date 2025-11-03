'use client';
import { useEffect, useRef, useState } from 'react';
import { urlFor } from '../utils/imageBuilder';


export default function SingleImageSwap({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage,
    hoverImage,
  } = value || {};

  const [isHovered, setIsHovered] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const intervalRef = useRef(null);

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsSwapped((prev) => !prev);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const showHoverImage = isHovered || isSwapped;

  return (
    <div
      className={`single-image-wrapper ${spaceBetwen}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="single-image-container" style={heightStyle}>
        {showHoverImage ? (
          <img
            src={urlFor(hoverImage.asset).width(1200).quality(70).auto('format').url()}
            alt={hoverImage.altText || 'Hover Image'}

            className="image-object"
          />
        ) : (
          <img
            src={urlFor(slideImage.asset).width(1200).quality(70).auto('format').url()}
          
            alt={slideImage.altText || 'Slide Image'}
            className="image-object"
          />
        )}
        {slideImage.caption && (
          <p className="image-caption">{slideImage.caption}</p>
        )}
      </figure>
    </div>
  );
}
