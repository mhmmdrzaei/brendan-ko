import { PortableText } from '@portabletext/react';

export default function TextItem({ value }) {
  const {
    spaceBetwen = 'medium',
    slideText,
    textAlign = 'left',
    lineHeight = '1.1',
  } = value || {};

  const style = {
    textAlign,
    lineHeight,
  };

  return (
    <div className={`text-item-wrapper ${spaceBetwen}`}>
      <div className="text-item-content" style={style}>
        <div style={style}>
          <PortableText value={slideText} />
        </div>
      </div>
    </div>
  );
}
