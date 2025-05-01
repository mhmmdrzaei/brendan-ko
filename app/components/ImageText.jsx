import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export default function ImageText({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage1,
    slideText,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}vh`, maxHeight: '100%' }
      : { height: '100%' };

  return (
    <div className={`image-text-wrapper ${spaceBetwen}`} style={heightStyle}>
{slideImage1?.asset?.url && (
  <div className="image-text-image">
    <Image
      src={slideImage1.asset.url}
      alt={slideImage1.altText || 'Slide Image'}
      fill
      className="image-object"
    />
    {slideImage1.caption && (
      <p className="image-caption">{slideImage1.caption}</p>
    )}
  </div>
)}
      <div className="image-text-content">
        <PortableText value={slideText} />
      </div>
    </div>
  );
}
