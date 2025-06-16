import { PortableText } from '@portabletext/react';

export default function TextItem({ value }) {
  const {
    spaceBetwen = 'medium',
    slideText,
  } = value || {};


  return (
    <div className={`text-item-wrapper ${spaceBetwen}`} >
      <div className="text-item-content">
        <PortableText value={slideText}  />
      </div>
    </div>
  );
}
