import { defineField, defineType } from "sanity";
import { GalleryThumbnailsIcon } from "lucide-react";

export default defineType({
  name: "slideItem",
  type: "object",
  title: "Slide Items",
  icon: GalleryThumbnailsIcon,
  fields: [
    defineField ({
      name: "slideOption",
      title: "Slides instead of horizontal scroll?",
      type: "boolean"
    }),
    defineField({
      name: "singleSlide",
      title: "Slide Items",
      type: "array",
      of: [
        {
          name: "singleImage",
          title: "Single Image",
          type: "singleImage"
        },
        {
          name: "imageText",
          title: "Image & Text",
          type: "imageText"
        },
        {
          name: "twoImage",
          title: "Two Image Slide",
          type: "twoImage"
        },
        {
          name: "textItem",
          title: "Text Slide",
          type: "textItem",
        },
        {
          name: "videoItem",
          title: "Video Slide",
          type: "videoItem"
        }
        
      ]
    }),
  ]
});
