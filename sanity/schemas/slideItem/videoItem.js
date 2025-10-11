import { defineField, defineType } from "sanity";
import { VideoIcon } from "lucide-react";

export default defineType({
  name: "videoItem",
  type: "object",
  title: "Video Embed",
  icon: VideoIcon,
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
      name: "videoEmbed",
      title: "Video url",
      type: "url",
      description: "Put your link here",
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ["https"],
            allowRelative: false,
          })
          .custom((url) =>
            url.includes("vimeo.com/") ? true : "Must be a valid Vimeo URL"
          ),
    }),
    defineField({
      name: "showControls",
      title: "Show Video Controls?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      height: "boxHeight",
      spacing: "spaceBetwen",
    },
    prepare({ height, spacing }) {
      return {
        title: "Video",
        subtitle: `${height ? `${height}%` : "100%"}, ${spacing || "Default"}`,
      };
    },
  },
});
