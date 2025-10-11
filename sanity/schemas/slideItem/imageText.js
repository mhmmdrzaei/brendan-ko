import { defineField, defineType } from "sanity";
import { BookImage } from "lucide-react";

export default defineType({
  name: "imageText",
  type: "object",
  title: "Image Text",
  icon: BookImage,
  fields: [
    defineField({
      name: "boxHeight",
      title: "Box Height",
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
      name: "slideImage1",
      title: "slide Image 1",
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
      name: "slideText",
      title: "Accompanying text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      media: "slideImage1",
      height: "boxHeight",
      spacing: "spaceBetwen",
    },
    prepare({ media, height, spacing }) {
      return {
        title: "Image Text",
        subtitle: `${height ? `${height}%` : "Auto"}, ${spacing || "Default"}`,
        media,
      };
    },
  },
});
