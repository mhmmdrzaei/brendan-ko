

export default function SingleImageStatic({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideImage,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  return (
    <div className={`single-image-wrapper ${spaceBetwen}`}>
      {slideImage?.asset && (
        <figure className="single-image-container" style={heightStyle}>
          <img  src={slideImage.asset.url}
            alt={slideImage.altText || 'Slide Image'}
            className="image-object"
            loading='lazy'/>

          {slideImage.caption && (
            <p className="image-caption">{slideImage.caption}</p>
          )}
        </figure>
      )}
    </div>
  );
}
