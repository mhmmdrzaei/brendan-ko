import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "twoImage",
  type: "object",
  title: "Two Images",
  icon: Images,
  fields: [
    defineField({
      name: "boxHeight",
      title: "Images Height",
      description: "if height is less than 100% fill out a number from 1 - 100",
      type: "number",
    }),
    defineField({
      title: "Space between item and next item",
      name: "spaceBetwen",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
      initialValue: "medium",
    }),

    // First image
    defineField({
      name: "slideImage1",
      title: "Slide Image 1",
      type: "image",
      fields: [
        defineField({ name: "caption", type: "string" }),
        defineField({ name: "altText", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "enableSwap1",
      title: "Enable Swap on Image 1?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "swapImage1",
      title: "Swap Image 1",
      type: "image",
      hidden: ({ parent }) => !parent?.enableSwap1,
      fields: [
        defineField({ name: "altText", title: "Alt Text", type: "string" }),
      ],
    }),

    // Second image
    defineField({
      name: "slideImage2",
      title: "Slide Image 2",
      type: "image",
      fields: [
        defineField({ name: "caption", type: "string" }),
        defineField({ name: "altText", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "enableSwap2",
      title: "Enable Swap on Image 2?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "swapImage2",
      title: "Swap Image 2",
      type: "image",
      hidden: ({ parent }) => !parent?.enableSwap2,
      fields: [
        defineField({ name: "altText", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
preview: {
  select: {
    media: 'slideImage1',
    height: 'boxHeight',
    spacing: 'spaceBetwen',
  },
  prepare({ media, height, spacing }) {
    return {
      title: 'Two Image',
      subtitle: `${height ? `${height}%` : 'Auto'}, ${spacing || 'Default'}`,
      media,
    };
  },
}
});
