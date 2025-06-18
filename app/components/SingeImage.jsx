
import SingleImageStatic from './SingleImageStatic';
import SingleImageSwap from './SingleImageSwap';


export default function SingleImage({ value }) {
  const { enableHoverSwap } = value || {};

  if (enableHoverSwap) {
    return <SingleImageSwap value={value} />;
  }

  return <SingleImageStatic value={value} />;
}
