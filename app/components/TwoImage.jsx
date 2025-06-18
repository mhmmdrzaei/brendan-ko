import TwoImageStatic from "./TwoImageStatic";
import TwoImageSwap from "./TwoImageSwap";

export default function TwoImage({ value }) {
  const {
    enableSwap1,
    swapImage1,
    enableSwap2,
    swapImage2,
  } = value || {};

  const shouldSwap =
    (enableSwap1 && swapImage1?.asset) ||
    (enableSwap2 && swapImage2?.asset);

  return shouldSwap
    ? <TwoImageSwap value={value} />
    : <TwoImageStatic value={value} />;
}
