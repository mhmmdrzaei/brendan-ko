import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "textItem",
  type: "object",
  title: "Text",
  icon: TextQuote,
  fields: [
    defineField({
        name:"boxHeight",
        title: "Box Height",
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
        name: "slideText",
        title: "Accompanying text",
        type: 'array', 
        of: [{type: 'block'}]
      }),
  ]
});
