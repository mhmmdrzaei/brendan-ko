import { defineField, defineType } from "sanity";
import { ImageIcon } from "lucide-react";

export default defineType({
  name: "singleImage",
  type: "object",
  title: "Single Image",
  icon: ImageIcon,
  fields: [
    defineField({
        name:"boxHeight",
        title: "Image Height",
        description:"if height is less than 100% fill out a number from 1 - 100",
        type: "number"
    }),
    defineField({
        title: 'Space between item and next item',
        name: 'spaceBetwen',
        type: 'string',
        options: {
            list: [
                { title: 'Small', value: 'small' },
                { title: 'Medium', value: 'medium' },
                { title: 'Large', value: 'large' },
            ],
        },
        initialValue: 'medium' 
    }),
    defineField({
        name: "slideImage",
        title: "slide Image",
        type: "image",
        fields: [
          defineField({
            name: 'caption',
            type: 'string',
          }),
          defineField({
            name: 'altText',
            title: "Alt Text",
            type: 'string',
          })
        ]
      }),
  ]
});
