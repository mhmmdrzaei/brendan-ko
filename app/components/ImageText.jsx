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
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  return (
    <div className={`image-text-wrapper ${spaceBetwen}`} style={heightStyle}>
{slideImage1?.asset?.url && (
  <figure className="image-text-image">
    <Image
      src={slideImage1.asset.url}
      alt={slideImage1.altText || 'Slide Image'}
      width={800}
      height={800}
      className="image-object"
    />
    {slideImage1.caption && (
      <p className="image-caption">{slideImage1.caption}</p>
    )}
  </figure>
)}
      <div className="image-text-content">
        <PortableText value={slideText} />
      </div>
    </div>
  );
}
