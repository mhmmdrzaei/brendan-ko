import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";

export default defineType({
  name: "singleImage",
  type: "object",
  title: "Single Image",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "boxHeight",
      title: "Image Height",
      description: "if height is less than 100% fill out a number from 1 - 100",
      type: "number",
    }),
    defineField({
      title: "Space between item and next item",
      name: "spaceBetwen",
      type: "string",
      options: {
        list: [
          { title: "No Space", value: "noSpace" },
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
          { title: "XL", value: "xl" },
          { title: "XXL", value: "xxl" },
          { title: "XXXL", value: "xxxl" },
        ],
      },
      initialValue: "medium",
    }),
    defineField({
      name: "slideImage",
      title: "Slide Image",
      type: "image",
      fields: [
        defineField({
          name: "caption",
          type: "string",
        }),
        defineField({
          name: "altText",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "enableHoverSwap",
      title: "Swap Image on Hover?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hoverImage",
      title: "Hover Image",
      type: "image",
      hidden: ({ parent }) => !parent?.enableHoverSwap,
      fields: [
        defineField({
          name: "altText",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "slideImage",
      height: "boxHeight",
      spacing: "spaceBetwen",
    },
    prepare({ media, height, spacing }) {
      return {
        title: "Single  Image",
        subtitle: `${height ? `${height}%` : "Auto"}, ${spacing || "Default"}`,
        media,
      };
    },
  },
});
