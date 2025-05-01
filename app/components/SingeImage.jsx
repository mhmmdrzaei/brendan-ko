import Image from 'next/image';

export default function SingleImage({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}vh`, maxHeight: '100%' }
      : { height: '100%' };

  return (
    <div className={`single-image-wrapper ${spaceBetwen}`} style={heightStyle}>
      {slideImage?.asset && (
        <div className="single-image-container">
          <Image
            src={slideImage.asset.url}
            alt={slideImage.altText || 'Slide Image'}
            fill
            className="image-object"
          />
          {slideImage.caption && (
            <p className="image-caption">{slideImage.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
