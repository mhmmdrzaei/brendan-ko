import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "twoImage",
  type: "object",
  title: "Two Images",
  icon: Images,
  fields: [
    defineField({
        name:"boxHeight",
        title: "Images Height",
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
        name: "slideImage1",
        title: "slide Image 1",
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
      defineField({
        name: "slideImage2",
        title: "slide Image 2",
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
