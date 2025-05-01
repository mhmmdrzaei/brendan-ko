import { PortableText } from '@portabletext/react';

export default function TextItem({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    slideText,
  } = value || {};

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}vh`, maxHeight: '100%' }
      : { height: '100%' };

  return (
    <div className={`text-item-wrapper ${spaceBetwen}`} style={heightStyle}>
      <div className="text-item-content">
        <PortableText value={slideText} />
      </div>
    </div>
  );
}
