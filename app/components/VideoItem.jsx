export default function VideoItem({ value }) {
  const {
    boxHeight,
    spaceBetwen = 'medium',
    videoEmbed,
  } = value || {};

  if (!videoEmbed) return null;

  const heightStyle =
    boxHeight && boxHeight < 100
      ? { height: `${boxHeight}%` }
      : { height: '100%' };

  const match = videoEmbed.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (!match) return null;

  const videoId = match[1];
  const hash = match[2];
  const embedUrl = `https://player.vimeo.com/video/${videoId}${hash ? `?h=${hash}` : '?'}&autoplay=1&muted=1&loop=1&background=1&controls=0&dnt=1`;

  return (
    <div className={`video-item-wrapper ${spaceBetwen}`}>
      <div className="video-item"  style={heightStyle}>
        <iframe
          src={embedUrl}
          style={{
            width: '100%',
            height: '100%',
            border: '0',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Embedded Vimeo Video"
        />
      </div>
    </div>
  );
}


