import Image from 'next/image';

export default function TwoImageStatic({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage1,
    slideImage2,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  return (
    <div className={`two-image-wrapper ${spaceBetwen}`}>
      {[slideImage1, slideImage2].map((img, index) => {
        if (!img?.asset) return null;

        return (
          <div className="two-image-item" style={heightStyle} key={index}>
            <Image
              src={img.asset.url}
              alt={img.altText || `Image ${index + 1}`}
              width={800}
              height={800}
              className="image-object"
            />
            {img.caption && <p className="image-caption">{img.caption}</p>}
          </div>
        );
      })}
    </div>
  );
}
