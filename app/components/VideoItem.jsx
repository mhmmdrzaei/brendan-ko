export default function VideoItem({ value }) {
    const {
      boxHeight,
      spaceBetwen = 'medium',
      videoEmbed,
    } = value || {};
  
    if (!videoEmbed) return null;
  
    const heightStyle =
      boxHeight && boxHeight < 100
        ? { height: `${boxHeight}vh`, maxHeight: '100%' }
        : { height: '100%' };
  
    return (
      <div className={`video-item-wrapper ${spaceBetwen}`} style={heightStyle}>
        <div className="video-item-embed">
          <iframe
            src={videoEmbed}
            title="Embedded video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
  