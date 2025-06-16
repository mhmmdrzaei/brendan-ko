import Image from 'next/image';

export default function SingleImage({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%`}
      : { height: '100%' };

  return (
    <div className={`single-image-wrapper ${spaceBetwen}`}>
      {slideImage?.asset && (
        <figure className="single-image-container" style={heightStyle}>
          <Image
            src={slideImage.asset.url}
            alt={slideImage.altText || 'Slide Image'}
            width={1400}
            height={800}
            className="image-object"
            
          />
          {slideImage.caption && (
            <p className="image-caption">{slideImage.caption}</p>
          )}
        </figure>
      )}
    </div>
  );
}
