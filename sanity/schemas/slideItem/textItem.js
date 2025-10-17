import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "textItem",
  type: "object",
  title: "Text",
  icon: TextQuote,
  fields: [
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
      title: "Text Alignment",
      name: "textAlign",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
          { title: "Center", value: "center" },
          { title: "Justify", value: "justify" },
        ],
      },
      initialValue: "left",
    }),
     defineField({
      title: "Line Height",
      name: "lineHeight",
      type: "string",
      options: {
        list: [
          { title: "1", value: "1.1" },
          { title: "1.5", value: "1.5" },
          { title: "2", value: "2" },
        ],
      },
      initialValue: "1.1",
    }),
    defineField({
      name: "slideText",
      title: "Accompanying text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare({}) {
      return {
        title: "Text",
      };
    },
  },
});
