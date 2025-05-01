import Image from 'next/image';

export default function TwoImage({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage1,
    slideImage2,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}vh`, maxHeight: '100%' }
      : { height: '100%' };

  return (
    <div className={`two-image-wrapper ${spaceBetwen}`} style={heightStyle}>
      {slideImage1?.asset && (
        <div className="two-image-item">
          <Image
            src={slideImage1.asset.url}
            alt={slideImage1.altText || 'Image 1'}
            fill
            className="image-object"
          />
          {slideImage1.caption && (
            <p className="image-caption">{slideImage1.caption}</p>
          )}
        </div>
      )}

      {slideImage2?.asset && (
        <div className="two-image-item">
          <Image
            src={slideImage2.asset.url}
            alt={slideImage2.altText || 'Image 2'}
            fill
            className="image-object"
          />
          {slideImage2.caption && (
            <p className="image-caption">{slideImage2.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
