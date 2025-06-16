'use client';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageText from "@/app/components/ImageText";
import SingleImage from "@/app/components/SingeImage";
import TextItem from "@/app/components/TextItem";
import TwoImage from "@/app/components/TwoImage";

import VideoItem from "@/app/components/VideoItem";
const componentMap = {
  imageText: ImageText,
  singleImage: SingleImage,
  textItem: TextItem,
  twoImage: TwoImage,
  videoItem: VideoItem,
};


export default function SliderWrapper({ tiles }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      {tiles.map((block) => {
        const BlockComponent = componentMap[block._type];
        return BlockComponent ? (
          <div key={block._key}>
            <BlockComponent value={block} />
          </div>
        ) : null;
      })}
    </Slider>
  );
}